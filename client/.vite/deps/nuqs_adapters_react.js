"use client";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/nuqs/dist/chunk-5WWTJYGR.js
var import_react = __toESM(require_react(), 1);
var errors = {
  303: "Multiple adapter contexts detected. This might happen in monorepos.",
  404: "nuqs requires an adapter to work with your framework.",
  409: "Multiple versions of the library are loaded. This may lead to unexpected behavior. Currently using `%s`, but `%s` (via the %s adapter) was about to load on top.",
  414: "Max safe URL length exceeded. Some browsers may not be able to accept this URL. Consider limiting the amount of state stored in the URL.",
  429: "URL update rate-limited by the browser. Consider increasing `throttleMs` for key(s) `%s`. %O",
  500: "Empty search params cache. Search params can't be accessed in Layouts.",
  501: "Search params cache already populated. Have you called `parse` twice?"
};
function error(code) {
  return `[nuqs] ${errors[code]}
  See https://err.47ng.com/NUQS-${code}`;
}
function renderQueryString(search) {
  if (search.size === 0) {
    return "";
  }
  const query = [];
  for (const [key, value] of search.entries()) {
    const safeKey = key.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/=/g, "%3D").replace(/\?/g, "%3F");
    query.push(`${safeKey}=${encodeQueryValue(value)}`);
  }
  const queryString = "?" + query.join("&");
  warnIfURLIsTooLong(queryString);
  return queryString;
}
function encodeQueryValue(input) {
  return input.replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/ /g, "+").replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "%22").replace(/'/g, "%27").replace(/`/g, "%60").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/[\x00-\x1F]/g, (char) => encodeURIComponent(char));
}
var URL_MAX_LENGTH = 2e3;
function warnIfURLIsTooLong(queryString) {
  if (false) {
    return;
  }
  if (typeof location === "undefined") {
    return;
  }
  const url = new URL(location.href);
  url.search = queryString;
  if (url.href.length > URL_MAX_LENGTH) {
    console.warn(error(414));
  }
}
var debugEnabled = isDebugEnabled();
function debug(message, ...args) {
  if (!debugEnabled) {
    return;
  }
  const msg = sprintf(message, ...args);
  performance.mark(msg);
  try {
    console.log(message, ...args);
  } catch (error2) {
    console.log(msg);
  }
}
function sprintf(base, ...args) {
  return base.replace(/%[sfdO]/g, (match) => {
    const arg = args.shift();
    if (match === "%O" && arg) {
      return JSON.stringify(arg).replace(/"([^"]+)":/g, "$1:");
    } else {
      return String(arg);
    }
  });
}
function isDebugEnabled() {
  try {
    if (typeof localStorage === "undefined") {
      return false;
    }
    const test = "nuqs-localStorage-test";
    localStorage.setItem(test, test);
    const isStorageAvailable = localStorage.getItem(test) === test;
    localStorage.removeItem(test);
    if (!isStorageAvailable) {
      return false;
    }
  } catch (error2) {
    console.error(
      "[nuqs]: debug mode is disabled (localStorage unavailable).",
      error2
    );
    return false;
  }
  const debug2 = localStorage.getItem("debug") ?? "";
  return debug2.includes("nuqs");
}
var context = (0, import_react.createContext)({
  useAdapter() {
    throw new Error(error(404));
  }
});
context.displayName = "NuqsAdapterContext";
if (debugEnabled && typeof window !== "undefined") {
  if (window.__NuqsAdapterContext && window.__NuqsAdapterContext !== context) {
    console.error(error(303));
  }
  window.__NuqsAdapterContext = context;
}
function createAdapterProvider(useAdapter2) {
  return ({ children, ...props }) => (0, import_react.createElement)(
    context.Provider,
    { ...props, value: { useAdapter: useAdapter2 } },
    children
  );
}

// node_modules/nuqs/dist/chunk-TCMXVJZC.js
var historyUpdateMarker = "__nuqs__";
function getSearchParams(url) {
  if (url instanceof URL) {
    return url.searchParams;
  }
  if (url.startsWith("?")) {
    return new URLSearchParams(url);
  }
  try {
    return new URL(url, location.origin).searchParams;
  } catch {
    return new URLSearchParams(url);
  }
}
function patchHistory(emitter2, adapter) {
  var _a, _b, _c;
  if (typeof history === "undefined") {
    return;
  }
  if (((_a = history.nuqs) == null ? void 0 : _a.version) && history.nuqs.version !== "0.0.0-inject-version-here") {
    console.error(
      error(409),
      history.nuqs.version,
      `0.0.0-inject-version-here`,
      adapter
    );
    return;
  }
  if ((_c = (_b = history.nuqs) == null ? void 0 : _b.adapters) == null ? void 0 : _c.includes(adapter)) {
    return;
  }
  let lastSearchSeen = typeof location === "object" ? location.search : "";
  emitter2.on("update", (search) => {
    const searchString = search.toString();
    lastSearchSeen = searchString.length ? "?" + searchString : "";
  });
  debug(
    "[nuqs %s] Patching history (%s adapter)",
    "0.0.0-inject-version-here",
    adapter
  );
  function sync(url) {
    try {
      const newSearch = new URL(url, location.origin).search;
      if (newSearch === lastSearchSeen) {
        return;
      }
    } catch {
    }
    try {
      emitter2.emit("update", getSearchParams(url));
    } catch (e) {
      console.error(e);
    }
  }
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function nuqs_pushState(state, marker, url) {
    originalPushState.call(history, state, "", url);
    if (url && marker !== historyUpdateMarker) {
      sync(url);
    }
  };
  history.replaceState = function nuqs_replaceState(state, marker, url) {
    originalReplaceState.call(history, state, "", url);
    if (url && marker !== historyUpdateMarker) {
      sync(url);
    }
  };
  history.nuqs = history.nuqs ?? {
    // This will be replaced by the prepack script
    version: "0.0.0-inject-version-here",
    adapters: []
  };
  history.nuqs.adapters.push(adapter);
}

// node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// node_modules/nuqs/dist/adapters/react.js
var import_react2 = __toESM(require_react());
var emitter = mitt_default();
function generateUpdateUrlFn(fullPageNavigationOnShallowFalseUpdates) {
  return function updateUrl(search, options) {
    const url = new URL(location.href);
    url.search = renderQueryString(search);
    if (fullPageNavigationOnShallowFalseUpdates && options.shallow === false) {
      const method = options.history === "push" ? location.assign : location.replace;
      method.call(location, url);
    } else {
      const method = options.history === "push" ? history.pushState : history.replaceState;
      method.call(history, history.state, "", url);
    }
    emitter.emit("update", search);
    if (options.scroll === true) {
      window.scrollTo({ top: 0 });
    }
  };
}
var NuqsReactAdapterContext = (0, import_react2.createContext)({
  fullPageNavigationOnShallowFalseUpdates: false
});
function useNuqsReactAdapter() {
  const { fullPageNavigationOnShallowFalseUpdates } = (0, import_react2.useContext)(
    NuqsReactAdapterContext
  );
  const [searchParams, setSearchParams] = (0, import_react2.useState)(() => {
    if (typeof location === "undefined") {
      return new URLSearchParams();
    }
    return new URLSearchParams(location.search);
  });
  (0, import_react2.useEffect)(() => {
    const onPopState = () => {
      setSearchParams(new URLSearchParams(location.search));
    };
    emitter.on("update", setSearchParams);
    window.addEventListener("popstate", onPopState);
    return () => {
      emitter.off("update", setSearchParams);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
  const updateUrl = (0, import_react2.useMemo)(
    () => generateUpdateUrlFn(fullPageNavigationOnShallowFalseUpdates),
    [fullPageNavigationOnShallowFalseUpdates]
  );
  return {
    searchParams,
    updateUrl
  };
}
var NuqsReactAdapter = createAdapterProvider(useNuqsReactAdapter);
function NuqsAdapter({
  children,
  fullPageNavigationOnShallowFalseUpdates = false
}) {
  return (0, import_react2.createElement)(
    NuqsReactAdapterContext.Provider,
    { value: { fullPageNavigationOnShallowFalseUpdates } },
    (0, import_react2.createElement)(NuqsReactAdapter, null, children)
  );
}
function enableHistorySync() {
  patchHistory(emitter, "react");
}
export {
  NuqsAdapter,
  enableHistorySync
};
//# sourceMappingURL=nuqs_adapters_react.js.map
