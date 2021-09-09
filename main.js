// Create the chart
Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Browser market shares. January, 2018'
    },
    subtitle: {
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total percent market share'
      }
  
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
  
    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 62.74,
            drilldown: "Chrome"
          },
          {
            name: "Firefox",
            y: 10.57,
            drilldown: "Firefox"
          },
          {
            name: "Internet Explorer",
            y: 7.23,
            drilldown: "Internet Explorer"
          },
          {
            name: "Safari",
            y: 5.58,
            drilldown: "Safari"
          },
          {
            name: "Edge",
            y: 4.02,
            drilldown: "Edge"
          },
          {
            name: "Opera",
            y: 1.92,
            drilldown: "Opera"
          },
          {
            name: "Other",
            y: 7.62,
            drilldown: null
          }
        ]
      }
    ],
    drilldown: {
      series: [
        {
          name: "Chrome",
          id: "Chrome",
          data: [
            [
              "v65.0",
              0.1
            ],
            [
              "v64.0",
              1.3
            ],
            [
              "v63.0",
              53.02
            ],
            [
              "v62.0",
              1.4
            ],
            [
              "v61.0",
              0.88
            ],
            [
              "v60.0",
              0.56
            ],
            [
              "v59.0",
              0.45
            ],
            [
              "v58.0",
              0.49
            ],
            [
              "v57.0",
              0.32
            ],
            [
              "v56.0",
              0.29
            ],
            [
              "v55.0",
              0.79
            ],
            [
              "v54.0",
              0.18
            ],
            [
              "v51.0",
              0.13
            ],
            [
              "v49.0",
              2.16
            ],
            [
              "v48.0",
              0.13
            ],
            [
              "v47.0",
              0.11
            ],
            [
              "v43.0",
              0.17
            ],
            [
              "v29.0",
              0.26
            ]
          ]
        },
        {
          name: "Firefox",
          id: "Firefox",
          data: [
            [
              "v58.0",
              1.02
            ],
            [
              "v57.0",
              7.36
            ],
            [
              "v56.0",
              0.35
            ],
            [
              "v55.0",
              0.11
            ],
            [
              "v54.0",
              0.1
            ],
            [
              "v52.0",
              0.95
            ],
            [
              "v51.0",
              0.15
            ],
            [
              "v50.0",
              0.1
            ],
            [
              "v48.0",
              0.31
            ],
            [
              "v47.0",
              0.12
            ]
          ]
        },
        {
          name: "Internet Explorer",
          id: "Internet Explorer",
          data: [
            [
              "v11.0",
              6.2
            ],
            [
              "v10.0",
              0.29
            ],
            [
              "v9.0",
              0.27
            ],
            [
              "v8.0",
              0.47
            ]
          ]
        },
        {
          name: "Safari",
          id: "Safari",
          data: [
            [
              "v11.0",
              3.39
            ],
            [
              "v10.1",
              0.96
            ],
            [
              "v10.0",
              0.36
            ],
            [
              "v9.1",
              0.54
            ],
            [
              "v9.0",
              0.13
            ],
            [
              "v5.1",
              0.2
            ]
          ]
        },
        {
          name: "Edge",
          id: "Edge",
          data: [
            [
              "v16",
              2.6
            ],
            [
              "v15",
              0.92
            ],
            [
              "v14",
              0.4
            ],
            [
              "v13",
              0.1
            ]
          ]
        },
        {
          name: "Opera",
          id: "Opera",
          data: [
            [
              "v50.0",
              0.96
            ],
            [
              "v49.0",
              0.82
            ],
            [
              "v12.1",
              0.14
            ]
          ]
        }
      ]
    }
  });


 Highcharts.addEvent(Highcharts.Point, 'click', function () {
    if (this.series.options.className.indexOf('popup-on-click') !== -1) {
      const chart = this.series.chart;
      const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
      const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;
  
      const anchorX = this.plotX + this.series.xAxis.pos;
      const anchorY = this.plotY + this.series.yAxis.pos;
      const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
      const x = align === 'left' ? anchorX + 10 : anchorX - 10;
      const y = anchorY - 30;
      if (!chart.sticky) {
        chart.sticky = chart.renderer
          .label(text, x, y, 'callout',  anchorX, anchorY)
          .attr({
            align,
            fill: 'rgba(0, 0, 0, 0.75)',
            padding: 10,
            zIndex: 7 // Above series, below tooltip
          })
          .css({
            color: 'white'
          })
          .on('click', function () {
            chart.sticky = chart.sticky.destroy();
          })
          .add();
      } else {
        chart.sticky
          .attr({ align, text })
          .animate({ anchorX, anchorY, x, y }, { duration: 250 });
      }
    }
  });
  
  
  Highcharts.chart('container-1', {
  
    chart: {
      scrollablePlotArea: {
        minWidth: 700
      }
    },
  
    data: {
      csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
      beforeParse: function (csv) {
        return csv.replace(/\n\n/g, '\n');
      }
    },
  
    title: {
      text: 'Daily sessions at www.highcharts.com'
    },
  
    subtitle: {
      text: 'Source: Google Analytics'
    },
  
    xAxis: {
      tickInterval: 7 * 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
        align: 'left',
        x: 3,
        y: -3
      }
    },
  
    yAxis: [{ // left y axis
      title: {
        text: null
      },
      labels: {
        align: 'left',
        x: 3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    }, { // right y axis
      linkedTo: 0,
      gridLineWidth: 0,
      opposite: true,
      title: {
        text: null
      },
      labels: {
        align: 'right',
        x: -3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    }],
  
    legend: {
      align: 'left',
      verticalAlign: 'top',
      borderWidth: 0
    },
  
    tooltip: {
      shared: true,
      crosshairs: true
    },
  
    plotOptions: {
      series: {
        cursor: 'pointer',
        className: 'popup-on-click',
        marker: {
          lineWidth: 1
        }
      }
    },
  
    series: [{
      name: 'All sessions',
      lineWidth: 4,
      marker: {
        radius: 4
      }
    }, {
      name: 'New users'
    }]
  });


  Highcharts.chart('line_chart', {
    title: {
        text: null
    },
    colors : ['#9781fc', '#c8e486', '#fac33b', '#f6807c', '#60c6fa', '#cf4a76'],
    yAxis:{
        lineWidth: 2,
        lineColor:'#cfdde5',
        // tickAmount:5,
        gridLineDashStyle : 'longdash',
        gridLineWidth : '1',
        labels: {
            style: {
                color: '#0a3ca2'
            }
        },
        title: {
            text : 'Cost',
            style: {
                color: '#000000',
            },
            align: 'middle'
        }
    },

    hAxis: {
        title: 'Dates',
        baselineColor: '#cfdde5',
        textStyle: {
            color: '#0a3ca2',
            fontName: 'Roboto',
            fontSize: 10
        }
    },

   xAxis: {
        categories: [
            'Jan 2020',
            'Feb 2020',
            'Mar 2020',
            'Apr 2020',
            'May 2020',
            'Jun 2020',
        ],
        crosshair: true,
        min: 0,
        DashStyleValue : 'Dash',
        title: {
            text: 'Months',
            style: {
                color: '#000000',
            },
            align: 'middle'
        },
        labels: {
            style: {
                color: '#0a3ca2'
            }
        },
    },

    legend: {
        symbolHeight: 8,
        symbolWidth: 8,
        symbolRadius: 0
    },

    plotOptions: {
        series: {
        dataLabels: {
            enabled: false
        },
        marker: {
            lineColor: null,
            lineWidth: 2,
            symbol: 'circle',
            fillColor: "#FFFFFF",
            states: {
                select: {
                    radius: 5,
                    lineColor: null
                }
            }
        },
        }
    },

    vAxis: {
        title: 'Dates',
        baselineColor: '#cfdde5',
        textStyle: {
            color: '#0a3ca2',
            fontName: 'Roboto',
            fontSize: 10
        }
    },

    series: [{
        name: 'EC2 Instance',
        data: [75, 75, 35, 40, 40, 45, 55, 60]
    }, {
        name: 'EC2 Other',
        data: [50, 50, 65, 60, 70, 65, 65, 55]
    }, {
        name: 'Tax',
        data: [11, 17, 16, 19, 20, 20, 15, 9]
    }, {
        name: 'Relational Database Service',
        data: [25, 40, 22, 12, 15, 22, 34, 34]
    }, {
        name: 'Refund',
        data: [12, 59, 18, 11, 38, 18, 14, 18]
    },{
        name: 'Other',
        data: [-20, -14, -5, -24, -19, -16, -24, -11]
    }],

    responsive: {
        rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
            }
        }
        }]
    }
});


Highcharts.chart('stacked-chart', {
  title: {
      text: null
  },
  chart: {
      type: 'column'
  },
  colors : ['#8a80fc', '#49bffa', '#f45c57', '#f9b93c', '#cf4a76', '#afd94f'],
  xAxis: {
      categories: [
          'Jan 2020',
          'Feb 2020',
          'Mar 2020',
          'Apr 2020',
          'May 2020',
          'Jun 2020',
      ],
      crosshair: true,
      min: 0,
      DashStyleValue : 'Dash',
      title: {
          text: 'Months',
          style: {
              color: '#000000',
          },
          align: 'middle'
      },
      labels: {
          style: {
              color: '#0a3ca2'
          }
      },
  },
  yAxis:{
      lineWidth: 2,
      lineColor:'#cfdde5',
      tickAmount:5,
      gridLineDashStyle : 'longdash',
      gridLineWidth : '1',
      labels: {
          style: {
              color: '#0a3ca2'
          }
      },
      title: {
          text : 'Cost',
          style: {
              color: '#000000',
          },
          align: 'middle'
      }
  },
  // tooltip: {
  //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
  //     footerFormat: '</table>',
  //     shared: true,
  //     useHTML: true
  // },
  plotOptions: {
      column: {
          pointPadding: 0,
          borderWidth: 0,
      },
      series: {
          pointWidth: 11,
      }
  },
  legend: {
        itemStyle: {
           fontSize:'8px',
           font: '8pt Trebuchet MS, Verdana, sans-serif',
           color: '#A0A0A0'
        },
  },
  series: [{
      name: 'Ec2-Instances',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]

  }, {
      name: 'Ec2-other',
      data: [83.6, 120, 98.5, 93.4, 106.0, 84.5]

  }, {
      name: 'Tax',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3]

  }, {
      name: 'Relational Database Service',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]
  }, {
      name: 'Refund',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]
  }, {
      name: 'Others',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]
  }]
});

