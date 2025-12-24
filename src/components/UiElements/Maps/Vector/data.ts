const mapOptsBasic = {
  normalizeFunction: 'polynomial',
  zoomOnScroll: false,
  hoverOpacity: 0.7,
  hoverColor: false,
  backgroundColor: 'transparent',
}

const mapOptsMarker = {
  normalizeFunction: 'polynomial',
  zoomOnScroll: false,
  hoverOpacity: 0.7,
  hoverColor: false,
  backgroundColor: 'transparent',
  labels: {
    markers: {
      render: function render(e: any) {
        return e.name
      },
    },
  },
  markers: [
    {
      name: 'Russia',
      coords: [61, 105],
      style: {
        fill: '#d13b4c',
      },
    },
    {
      name: 'Geenland',
      coords: [72, -42],
      style: {
        fill: '#3dc7be',
      },
    },
    {
      name: 'Canada',
      coords: [56, -106],
      style: {
        fill: '#ea4d4d',
      },
    },
    {
      name: 'Palestine',
      coords: [31.5, 34.8],
      style: {
        fill: '#fd7e14',
      },
    },
    {
      name: 'Brazil',
      coords: [-14.235, -51.9253],
      style: {
        fill: '#000000',
      },
    },
    {
      name: 'China',
      coords: [35.8617, 104.1954],
      style: {
        fill: '#25b865',
      },
    },
    {
      name: 'United States',
      coords: [37.0902, -95.7129],
      style: {
        fill: '#963258',
      },
      offsets: [2, 2],
    },
  ],
  markerStyle: {
    hover: {
      stroke: '#DDD',
      strokeWidth: 3,
      fill: '#FFF',
    },
    selected: {
      fill: '#ff525d',
    },
  },
  markerLabelStyle: {
    initial: {
      fontFamily: 'Inter',
      fontSize: 13,
      fontWeight: 500,
      fill: '#35373e',
    },
  },
}

const mapOptsLine = {
  normalizeFunction: 'polynomial',
  zoomOnScroll: false,
  hoverOpacity: 0.7,
  hoverColor: false,
  backgroundColor: 'transparent',
  labels: {
    markers: {
      render: function render(e: any) {
        return e.name
      },
    },
  },
  markers: [
    {
      name: 'Russia',
      coords: [61.524, 105.3188],
    },
    {
      name: 'Egypt',
      coords: [26.8206, 30.8025],
    },
    {
      name: 'Canada',
      coords: [56, -106],
      offsets: [-7, 12],
    },
    {
      name: 'United States',
      coords: [37.0902, -95.7129],
      offsets: [-7, 12],
    },
    {
      name: 'Brazil',
      coords: [-14.235, -51.9253],
    },
    {
      name: 'China',
      coords: [35.8617, 104.1954],
      offsets: [-7, 12],
    },
    {
      name: 'Australia',
      coords: [-25.2744, 133.7751],
      offsets: [7, 12],
    },
    {
      name: 'United Kingdom',
      coords: [55.3781, -3.436],
      offsets: [-7, -25],
    },
    {
      name: 'South Africa',
      coords: [-30.5595, 22.9375],
      offsets: [7, 12],
    },
  ],
  lines: [
    {
      from: 'Russia',
      to: 'Egypt',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Canada',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'United States',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Brazil',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'China',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Egypt',
      to: 'Canada',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Australia',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'United Kingdom',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'South Africa',
      to: 'Russia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'United States',
      to: 'Brazil',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Brazil',
      to: 'China',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'Canada',
      to: 'Australia',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
    {
      from: 'South Africa',
      to: 'Egypt',
      style: {
        stroke: '#abb0b7',
        strokeWidth: 1.5,
      },
    },
  ],
  lineStyle: {
    animation: !0,
    strokeDasharray: '6 3 6',
  },
  markerStyle: {
    initial: {
      r: 6,
      fill: '#3e97ff',
      stroke: '#fff',
      strokeWidth: 3,
    },
  },
  markerLabelStyle: {
    initial: {
      fontSize: 13,
      fontWeight: 500,
      fill: '#35373e',
    },
  },
}

const mapOptsAdvanced = {
  normalizeFunction: 'polynomial',
  zoomOnScroll: false,
  hoverOpacity: 0.7,
  hoverColor: false,
  backgroundColor: 'transparent',
  labels: {
    markers: {
      render: function render(e: any) {
        return e.name
      },
    },
    regions: {
      render: function render(e: any) {
        if (-1 < ['EG', 'KZ', 'CN'].indexOf(e)) return ''
      },
    },
  },
  regionStyle: {
    selected: {
      fill: '#3E97FF',
    },
  },
  regionLabelStyle: {},
  markers: [
    {
      name: 'Russia',
      coords: [61, 105],
      style: {
        r: 10,
      },
    },
    {
      name: 'Geenland',
      coords: [72, -42],
      style: {
        r: 11,
      },
    },
    {
      name: 'Canada',
      coords: [56, -106],
      style: {
        r: 15,
      },
    },
    {
      name: 'Palestine',
      coords: [31.5, 34.8],
      style: {
        r: 7,
      },
    },
    {
      name: 'Brazil',
      coords: [-14.235, -51.9253],
    },
    {
      name: 'China',
      coords: [35.8617, 104.1954],
      offsets: [2, 2],
    },
  ],
  markerStyle: {
    initial: {
      fill: '#ff5566',
    },
    hover: {
      stroke: '#676767',
      fillOpacity: 1,
      strokeWidth: 2.5,
      fill: '#ff5566',
    },
    selected: {
      fill: '#ff9251',
    },
  },
  markerLabelStyle: {
    initial: {
      fontSize: 13,
      fontWeight: 500,
      fill: '#35373e',
    },
  },
  series: {
    markers: [
      {
        attribute: 'fill',
        legend: {
          title: 'Something (marker)',
        },
        scale: {
          'Criteria one': '#ffd400',
          'Criteria two': '#3e97ff',
        },
        values: {
          0: 'Criteria one',
          1: 'Criteria two',
          2: 'Criteria two',
        },
      },
    ],
    regions: [
      {
        attribute: 'fill',
        attributes: {},
        legend: {
          title: 'Some title (region)',
          vertical: !0,
        },
        scale: {
          Criteria: '#4bdc77',
          'Another Criteria': '#ff5566',
        },
        values: {
          GB: 'Another Criteria',
          MX: 'Criteria',
        },
      },
    ],
  },
}

export { mapOptsBasic, mapOptsMarker, mapOptsLine, mapOptsAdvanced }
