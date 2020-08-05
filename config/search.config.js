require("dotenv").config();

const bingHostname = process.env.BING_HOSTNAME;
const bingWebSearchPathname = process.env.BING_WEB_SEARCH_PATHNAME;
const bingWebSearchKey = process.env.BING_WEB_SEARCH_KEY;
const bingCustomSearchPathname = process.env.BING_CUSTOM_SEARCH_PATHNAME;
const bingCustomSearchKey = process.env.BING_CUSTOM_SEARCH_KEY;
const bingCustomSearchCustomConfig = process.env.BING_CUSTOM_SEARCH_CONFIG;

if (!bingHostname) {
    throw new Error('BING_HOSTNAME is not set.')
} else if(!bingWebSearchPathname) {
    throw new Error('BING_WEB_SEARCH_PATHNAME is not set.')
} else if(!bingWebSearchKey) {
    throw new Error('BING_WEB_SEARCH_KEY is not set.')
} else if(!bingCustomSearchPathname) {
    throw new Error('BING_CUSTOM_SEARCH_PATHNAME is not set.')
} else if(!bingCustomSearchKey) {
    throw new Error('BING_CUSTOM_SEARCH_KEY is not set.')
} else if(!bingCustomSearchCustomConfig) {
    throw new Error('BING_CUSTOM_SEARCH_CONFIG is not set.')
}

module.exports = {
    bingHostname,
    bingWebSearchPathname,
    bingWebSearchKey,
    bingCustomSearchPathname,
    bingCustomSearchKey,
    bingCustomSearchCustomConfig,
  };