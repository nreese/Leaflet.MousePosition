L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: 'Unavailable',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    if (this.options.lngFormatter) lng = this.options.lngFormatter(lng);
    if (this.options.latFormatter) lat = this.options.latFormatter(lat);
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    this._container.innerHTML = value;
  }

});

L.control.mousePosition = function (options) {
  return new L.Control.MousePosition(options);
};