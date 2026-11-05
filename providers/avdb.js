/**
 * avdb Provider for Nuvio
 * Generated: 2026-11-05T05:58:28.200Z
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/avdb/index.js
var avdb_exports = {};
__export(avdb_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(avdb_exports);

// src/avdb/utils.js
var USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var AVDB_API_BASE = "https://avdbapi.com/api.php/provide/vod";
var STREAM_HEADERS = {
  "Referer": "https://upload18.org/",
  "Origin": "https://upload18.org",
  "User-Agent": USER_AGENT
};
var EMBED_FETCH_HEADERS = {
  "User-Agent": USER_AGENT,
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5"
};
function sanitizeUrl(url) {
  if (!url || typeof url !== "string")
    return "";
  return url.replace(/\\\//g, "/").replace(/\\u0026/g, "&").trim();
}
function extractMovieCode(input) {
  if (!input || typeof input !== "string")
    return "";
  const clean = input.trim();
  const codeMatch = clean.match(/\b([A-Z0-9]{2,10}[-_][0-9]{2,6}(?:[-_][A-Z0-9]+)?)\b/i);
  if (codeMatch) {
    return codeMatch[1].toUpperCase();
  }
  return clean;
}

// src/avdb/extractor.js
function fetchMovieFromAVDB(identifier) {
  return __async(this, null, function* () {
    if (!identifier)
      return null;
    const rawId = String(identifier).replace(/^avdb:/, "").trim();
    if (/^\d+$/.test(rawId)) {
      try {
        const url = `${AVDB_API_BASE}?ac=detail&ids=${rawId}`;
        const res = yield fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok)
          return null;
        const data = yield res.json();
        if (Array.isArray(data.list) && data.list.length > 0) {
          return data.list[0];
        }
      } catch (err) {
        console.error(`[AVDB Extractor] ID fetch error (${rawId}):`, err.message);
      }
    }
    const searchQuery = extractMovieCode(rawId);
    try {
      const url = `${AVDB_API_BASE}?ac=detail&wd=${encodeURIComponent(searchQuery)}&pg=1`;
      const res = yield fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok)
        return null;
      const data = yield res.json();
      if (Array.isArray(data.list) && data.list.length > 0) {
        const exact = data.list.find(
          (item) => item.movie_code && item.movie_code.toUpperCase() === searchQuery.toUpperCase()
        );
        return exact || data.list[0];
      }
    } catch (err) {
      console.error(`[AVDB Extractor] Search error (${searchQuery}):`, err.message);
    }
    return null;
  });
}
function extractM3u8FromEmbed(embedUrl) {
  return __async(this, null, function* () {
    if (!embedUrl || typeof embedUrl !== "string")
      return null;
    try {
      const res = yield fetch(embedUrl, {
        headers: EMBED_FETCH_HEADERS
      });
      if (!res.ok) {
        console.error(`[AVDB Extractor] Embed page returned ${res.status}: ${embedUrl}`);
        return null;
      }
      const html = yield res.text();
      const configMatch = html.match(new RegExp("window\\.PLAYER_CONFIG\\s*=\\s*(\\{.+?\\});", "s"));
      if (configMatch) {
        try {
          const config = JSON.parse(configMatch[1]);
          if (config.m3u8 && typeof config.m3u8 === "string") {
            return sanitizeUrl(config.m3u8);
          }
        } catch (jsonErr) {
        }
      }
      const m3u8Match = html.match(/"m3u8"\s*:\s*"([^"]+)"/);
      if (m3u8Match && m3u8Match[1]) {
        return sanitizeUrl(m3u8Match[1]);
      }
      console.warn(`[AVDB Extractor] No M3U8 found in embed HTML for ${embedUrl}`);
      return null;
    } catch (err) {
      console.error(`[AVDB Extractor] Failed to extract from embed ${embedUrl}:`, err.message);
      return null;
    }
  });
}
function extractStreamsFromItem(item) {
  return __async(this, null, function* () {
    var _a;
    if (!item)
      return [];
    const serverData = (_a = item.episodes) == null ? void 0 : _a.server_data;
    if (!serverData)
      return [];
    const entries = Object.entries(serverData);
    const streams = [];
    const quality = item.quality || "1080p";
    const movieName = item.movie_code || item.name || "Movie";
    const duration = item.time ? ` \u2022 ${item.time}` : "";
    for (const [partName, epInfo] of entries) {
      if (!epInfo || !epInfo.link_embed)
        continue;
      const m3u8Url = yield extractM3u8FromEmbed(epInfo.link_embed);
      if (m3u8Url) {
        const partTag = entries.length > 1 && partName !== "Full" ? ` (${partName})` : "";
        streams.push({
          name: `AVDB Direct \u{1F680}${partTag}`,
          title: `\u{1F680} [${quality}] Direct CDN${partTag}
\u{1F4FA} Full HD \u2022 HLS${duration}
\u2B50 ${movieName}`,
          url: m3u8Url,
          quality,
          headers: STREAM_HEADERS
        });
      }
    }
    return streams;
  });
}

// src/avdb/index.js
function getStreams(tmdbId, mediaType, season, episode, userConfig) {
  return __async(this, null, function* () {
    try {
      console.log(`[AVDB Nuvio Provider] Fetching streams for: ${tmdbId} (${mediaType || "movie"})`);
      const item = yield fetchMovieFromAVDB(tmdbId);
      if (!item) {
        console.log(`[AVDB Nuvio Provider] No movie found for identifier: ${tmdbId}`);
        return [];
      }
      const streams = yield extractStreamsFromItem(item);
      console.log(`[AVDB Nuvio Provider] Extracted ${streams.length} stream(s) for ${item.movie_code || item.name}`);
      return streams;
    } catch (error) {
      console.error(`[AVDB Nuvio Provider] Error in getStreams: ${error.message}`);
      return [];
    }
  });
}
