//Leaflet-SVGIcon
//SVG icon for any marker class
//Ilya Atkin
//ilya.atkin@unh.edu

L.DivIcon.SVGIcon = L.DivIcon.extend({
  options: {
    circleText: "",
    className: "svg-icon",
    circleAnchor: null, //defaults to [iconSize.x/2, iconSize.x/2]
    circleColor: null, //defaults to color
    circleOpacity: null, // defaults to opacity
    circleFillColor: "rgb(255,255,255)",
    circleFillOpacity: null, //default to opacity
    circleRatio: 0.5,
    circleWeight: null, //defaults to weight
    color: "rgb(0,102,255)",
    fillColor: null, // defaults to color
    fillOpacity: 0.4,
    fontColor: "rgb(0, 0, 0)",
    fontOpacity: "1",
    fontSize: null, // defaults to iconSize.x/4
    fontWeight: "normal",
    iconAnchor: null, //defaults to [iconSize.x/2, iconSize.y] (point tip)
    iconSize: L.point(32, 48),
    opacity: 1,
    popupAnchor: null,
    weight: 2,
    scale: 1,
  },
  initialize: function (options) {
    options = L.Util.setOptions(this, options);

    //iconSize needs to be converted to a Point object if it is not passed as one
    options.iconSize = L.point(options.iconSize);

    //in addition to setting option dependant defaults, Point-based options are converted to Point objects
    if (!options.circleAnchor) {
      options.circleAnchor = L.point(
        Number(options.iconSize.x) / 2,
        Number(options.iconSize.x) / 2
      );
    } else {
      options.circleAnchor = L.point(options.circleAnchor);
    }
    if (!options.circleColor) {
      options.circleColor = options.color;
    }
    if (!options.circleFillOpacity) {
      options.circleFillOpacity = options.opacity;
    }
    if (!options.circleOpacity) {
      options.circleOpacity = options.opacity;
    }
    if (!options.circleWeight) {
      options.circleWeight = options.weight;
    }
    if (!options.fillColor) {
      options.fillColor = options.color;
    }
    if (!options.fontSize) {
      options.fontSize = Number(options.iconSize.x / 4);
    }
    if (!options.iconAnchor) {
      options.iconAnchor = L.point(
        Number(options.iconSize.x) / 2,
        Number(options.iconSize.y)
      );
    } else {
      options.iconAnchor = L.point(options.iconAnchor);
    }
    if (!options.popupAnchor) {
      options.popupAnchor = L.point(0, -0.75 * options.iconSize.y);
    } else {
      options.popupAnchor = L.point(options.popupAnchor);
    }

    options.html = this._createSVG();
  },
  _createCircle: function () {
    const cx = Number(this.options.circleAnchor.x);
    const cy = Number(this.options.circleAnchor.y);
    const radius =
      (this.options.iconSize.x / 2) * Number(this.options.circleRatio);
    const fill = this.options.circleFillColor;
    const fillOpacity = this.options.circleFillOpacity;
    const stroke = this.options.circleColor;
    const strokeOpacity = this.options.circleOpacity;
    const strokeWidth = this.options.circleWeight;
    const className = this.options.className + "-circle";

    var circle =
      '<circle class="' +
      className +
      '" cx="' +
      cx +
      '" cy="' +
      cy +
      '" r="' +
      radius +
      '" fill="' +
      fill +
      '" fill-opacity="' +
      fillOpacity +
      '" stroke="' +
      stroke +
      '" stroke-opacity=' +
      strokeOpacity +
      '" stroke-width="' +
      strokeWidth +
      '"/>';

    return circle;
  },
  _createPathDescription: function () {
    var height = Number(this.options.iconSize.y);
    var width = Number(this.options.iconSize.x);
    var weight = Number(this.options.weight);
    var margin = weight / 2;

    var startPoint = "M " + margin + " " + width / 2 + " ";
    var leftLine = "L " + width / 2 + " " + (height - weight) + " ";
    var rightLine = "L " + (width - margin) + " " + width / 2 + " ";
    var arc =
      "A " +
      width / 4 +
      " " +
      width / 4 +
      " 0 0 0 " +
      margin +
      " " +
      width / 2 +
      " Z";

    var d = startPoint + leftLine + rightLine + arc;

    return d;
  },
  _createPath() {
    var scale = this.options.scale;
    var pathDescription = this._createPathDescription();
    var strokeWidth = this.options.weight / scale;
    var stroke = this.options.color;
    var strokeOpacity = this.options.opacity;
    var fill = this.options.fillColor;
    var fillOpacity = this.options.fillOpacity;
    var className = this.options.className + "-path";

    return '<path class="' +
      className +
      '" d="' +
      pathDescription +
      '" stroke-width="' +
      strokeWidth +
      '" stroke="' +
      stroke +
      '" stroke-opacity="' +
      strokeOpacity +
      '" fill="' +
      fill +
      '" fill-opacity="' +
      fillOpacity +
      '"/>';
  },
  _createSVG() {
    const scale = this.options.scale;
    const path = this._createPath();
    const circle = this._createCircle();
    const text = this._createText();
    const className = this.options.className + "-svg";

    const style =
      "width:" +
      this.options.iconSize.x +
      "px; height:" +
      this.options.iconSize.y +
      "px;";

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
      this.options.iconSize.x / scale +
      " " +
      this.options.iconSize.y / scale +
      '" class="' +
      className +
      '" style="' +
      style +
      '">' +
      path +
      circle +
      text +
      "</svg>";
  },
  _createText() {
    var fontSize = this.options.fontSize + "px";
    var fontWeight = this.options.fontWeight;
    var lineHeight = Number(this.options.fontSize);

    var x = this.options.circleAnchor.x;
    var y = this.options.circleAnchor.y + lineHeight * 0.35; //35% was found experimentally
    var circleText = this.options.circleText;
    var textColor = this.options.fontColor
      .replace("rgb(", "rgba(")
      .replace(")", "," + this.options.fontOpacity + ")");

    var text =
      '<text text-anchor="middle" x="' +
      x +
      '" y="' +
      y +
      '" style="font-size: ' +
      fontSize +
      "; font-weight: " +
      fontWeight +
      '" fill="' +
      textColor +
      '">' +
      circleText +
      "</text>";

    return text;
  },
});

L.divIcon.svgIcon = function (options) {
  return new L.DivIcon.SVGIcon(options);
};

L.Marker.SVGMarker = L.Marker.extend({
  options: {
    iconFactory: L.divIcon.svgIcon,
    iconOptions: {},
  },
  initialize: function (latlng, options) {
    options = L.Util.setOptions(this, options);
    options.icon = options.iconFactory(options.iconOptions);
    this._latlng = latlng;
  },
  onAdd: function (map) {
    L.Marker.prototype.onAdd.call(this, map);
  },
  setStyle: function (style) {
    if (this._icon) {
      var svg = this._icon.children[0];
      var iconBody = this._icon.children[0].children[0];
      var iconCircle = this._icon.children[0].children[1];

      if (style.color && !style.iconOptions) {
        var stroke = style.color
          .replace("rgb", "rgba")
          .replace(")", "," + this.options.icon.options.opacity + ")");
        var fill = style.color
          .replace("rgb", "rgba")
          .replace(")", "," + this.options.icon.options.fillOpacity + ")");
        iconBody.setAttribute("stroke", stroke);
        iconBody.setAttribute("fill", fill);
        iconCircle.setAttribute("stroke", stroke);

        this.options.icon.fillColor = fill;
        this.options.icon.color = stroke;
        this.options.icon.circleColor = stroke;
      }
      if (style.opacity) {
        this.setOpacity(style.opacity);
      }
      if (style.iconOptions) {
        if (style.color) {
          style.iconOptions.color = style.color;
        }
        var iconOptions = L.Util.setOptions(
          this.options.icon,
          style.iconOptions
        );
        this.setIcon(L.divIcon.svgIcon(iconOptions));
      }
    }
  },
});

L.marker.svgMarker = function (latlng, options) {
  return new L.Marker.SVGMarker(latlng, options);
};
