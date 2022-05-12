// TP PERF METRICS
(function () {
  if (!window.TP_PERF_METRICS) {
    if (("performance" in window) && ("currentScript" in document)) {
      window.TP_PERF_METRICS = {
        entries: {},
        resourcesByType: {},
        addResourceByType: function addResourceByType(type, resource) {
          if (!this.resourcesByType[type]) this.resourcesByType[type] = [];
          if (this.resourcesByType[type].indexOf(resource) === -1) this.resourcesByType[type].push(resource);
        },
        addResourceById: function addResourceById(id, resource) {
          if (!this.entries[id].resources.some(function(resourceEntries){
            var entry = resourceEntries.name ?  resourceEntries.name : resourceEntries;
            return entry === resource
          })) {
            this.entries[id].resources.push(resource);
          }
        },
        entrypoint: function entrypoint(id, type) {
          if (!this.entries[id]) {
            this.entries[id] = {
              type: undefined,
              calculated: false,
              initializedTime: undefined,
              endTime: undefined,
              duration: undefined,
              totalSize: 0,
              requestDuration: undefined,
              resources: []
            };
          }
          if (type && !this.entries[id].type) this.entries[id].type = type;
        },
        initialized: function initialized(id, type) {
          if (!this.entries[id]) {
            this.entrypoint(id, type);
          }
          var entry = this.entries[id];

          if (entry && entry.initializedTime) {
            return;
          }
          entry.initializedTime = performance.now();
          entry.endTime = entry.initializedTime;
        },
        calculateMetrics: function calculateMetrics(id) {
          var entry = this.entries[id];
          var _this = this;

          if (entry.calculated) return;
          entry.calculated = true;

          if (this.resourcesByType[entry.type]) this.resourcesByType[entry.type].forEach(function (resource) {
            _this.addResourceById(id, resource);
          });
          entry.resources = entry.resources.map(function (name) {
            var perf = _this.findResourceMetrics(name);

            if (perf) {
              entry.nextHopProtocol = perf.nextHopProtocol;
              if (!entry.startTime || entry.startTime > perf.startTime) entry.startTime = perf.startTime;
              if (entry.endTime < perf.responseEnd) entry.endTime = perf.responseEnd;
              if (!entry.responseEnd || entry.responseEnd < perf.responseEnd) entry.responseEnd = perf.responseEnd;
              entry.totalSize += perf.transferSize;
              return {
                duration: perf.duration,
                transferSize: perf.transferSize,
                startTime: perf.startTime,
                responseEnd: perf.responseEnd,
                name: perf.name
              };
            }
          });
          entry.requestDuration = entry.responseEnd - entry.startTime;
          entry.duration = entry.endTime - entry.startTime;
          entry.totalSize = Math.floor(entry.totalSize / 1024);
        },
        findResourceMetrics: function findResourceMetrics(resource) {
          var perf = performance.getEntriesByName(name)[0];

          if (!perf) {
            var perfs = performance.getEntriesByType('resource');

            for (var i = 0; i < perfs.length; i++) {
              if (perfs[i].name.indexOf(resource) !== -1) {
                perf = perfs[i];
                break;
              }
            }
          }

          return perf;
        }
      };
    }
  }
})();
if (("performance" in window) && ("currentScript" in document)) {
  window.TP_PERF_METRICS.entrypoint("7e5301fb8bc23e6aeb9c8b4d868e4854", "mewtwo");
  window.TP_PERF_METRICS.addResourceById("7e5301fb8bc23e6aeb9c8b4d868e4854", document.currentScript.src);
}

// JS Wraper

(function () {
  var initialized_attr = "initialized",
      target_src = function(){ return "https://travelformcustom.pages.dev/static.js" },
      ref = document.getElementsByTagName('script'),
      trace_id = 'Zz4914b5c6325b4954b75c70a-336109',
      promo_id = 4237;

  if (window.mewtwo) {
    window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"] = window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"] ? window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"] : {};
   } else {
    window.mewtwo =  {"7e5301fb8bc23e6aeb9c8b4d868e4854" : {} };
  }
  window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"].trace_id  = window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"].trace_id ?  window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"].trace_id  : [];
  window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"].trace_id.push('Zz4914b5c6325b4954b75c70a-336109');
  window.mewtwo["7e5301fb8bc23e6aeb9c8b4d868e4854"].promo_id = 4237


  for (var i = 0, len = ref.length; i < len; i++) {
    var script = ref[i];
    var src = script.getAttribute('src');

    if (src) {
      script.setAttribute('script-initialized', true);

      function getParams() {
        var params = {};
        script.src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
          params[key] = decodeURIComponent(value);
        });
        return params;
      }

      var url_params = getParams(),
          js = document.createElement('script');

      js.setAttribute(initialized_attr, 'true');
      js.setAttribute('script-initialized', 'true');

      var params = [];
      for (var name in url_params) {
        if (url_params.hasOwnProperty(name)) {
          params.push(name + "=" + encodeURIComponent(url_params[name]))
        }
      }

      var target_src_string = target_src();
      var separator = (target_src_string.indexOf('?') === -1 ? '?' : '&');
      js.src = target_src_string;
      if (params.length > 0) {
        js.src += separator + params.join('&');
      }
      if (("performance" in window) && ("currentScript" in document)) {
        window.TP_PERF_METRICS.addResourceById("7e5301fb8bc23e6aeb9c8b4d868e4854", js.src);
      }
      script.parentNode.insertBefore(js, script);
      var url = "//avsplow.com/a/j.gif?p=web&tv=pixel&e=se&aid=tp_widgets&se_ca=mewtwo&se_ac=proxy_init&co=%7B%22schema%22%3A%22contexts%22%2C%22data%22%3A%5B%7B%22schema%22%3A%22event%22%2C%22data%22%3A%7B%22widget_id%22%3A%227e5301fb8bc23e6aeb9c8b4d868e4854%22%2C%22trace_id%22%3A%22Zz4914b5c6325b4954b75c70a-336109%22%2C%22promo_id%22%3A%224237%22%7D%7D%5D%7D";
function addPixel(src) {
  var img = new Image();
  img.src = src;
  img.setAttribute('style', 'position: absolute; top: 0; left: -100px; width: 1px; height: 1px;');
  return document.body.appendChild(img);
};
addPixel(url);
      break;
    }
  }
})();



/*! link: /mewtwo/styles.css?v=002 */
/*! link: /widgets_static/7e5301fb8bc23e6aeb9c8b4d868e4854.js */
