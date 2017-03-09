$(function() {
  $(document).ready(function() {

    // Create new aREST device when button is clicked
    $('#validate').click(function() {
      var address = $('#device_address').val();
      var device = new Device(address);

      // Set device pins
      //device.pinMode(6, "OUTPUT");
      device.pinMode(13, "OUTPUT");

      //Toggle checkbox
      $('#toggle-13').change(function() {
          // this will contain a reference to the checkbox   
          if (this.checked) {
              device.digitalWrite(13, 1);
          } else {
              device.digitalWrite(13, 0);
          }
      });

      //Analog read every 5 seconds
      device.analogRead(0, function(data) {
        $("#A0").html(data.return_value);
      });
      setInterval(function() {
        device.analogRead(0, function(data) {
          $("#A0").html(data.return_value);
        });
      }, 5000);

      device.analogRead(1, function(data) {
        $("#A1").html(data.return_value);
      });
      setInterval(function() {
        device.analogRead(1, function(data) {
          $("#A1").html(data.return_value);
        });
      }, 5000);

      // // Analog write
      // $('#slider').mouseup(function() {
      //   var val = $('#slider').val();
      //   device.analogWrite(6, val);
      // });

      /*
      // Button
      $('#on').click(function() {
        device.digitalWrite(13, 1);
      });

      $('#off').click(function() {
        device.digitalWrite(13, 0);
      });
      */

      // Digital read every 5 seconds
      // device.digitalRead(11, function(data) {
      //   $('#2').html(data.return_value);
      // });
      // setInterval(function() {
      //   device.digitalRead(11, function(data) {
      //     $('#2').html(data.return_value);
      //   });
      // }, 1000);

      // // Temperature display
      // device.getVariable('temperature', function(data) {
      //   $('#temperature').html(data.temperature);
      // });
      //
      // // Humidity display
      // device.getVariable('humidity', function(data) {
      //   $('#humidity').html(data.humidity);
      // });

    Highcharts.theme = {
      colors: [
        '#FFFFFF',
        '#90ee7e',
        '#f45b5b',
        '#7798BF',
        '#aaeeee',
        '#ff0066',
        '#eeaaee',
        '#55BF3B',
        '#DF5353',
        '#7798BF',
        '#aaeeee'
      ],
      chart: {
        backgroundColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1
          },
          stops: [
            [
              0, '#2196f3'
            ],
            [1, '#2a7ec1']
          ]
        },
        style: {
          fontFamily: '\'Roboto\', sans-serif'
        },
        plotBorderColor: '#2196f3'
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '16px'
        }
      },
      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },
      xAxis: {
        gridLineColor: '#FFFFFF',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#FFFFFF',
        minorGridLineColor: '#505053',
        tickColor: '#FFFFFF',
        title: {
          style: {
            color: '#A0A0A3'

          }
        }
      },
      yAxis: {
        gridLineColor: '#FFFFFF',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#FFFFFF',
        minorGridLineColor: '#505053',
        tickColor: '#FFFFFF',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          }
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
        }
      },
      legend: {
        itemStyle: {
          color: '#E0E0E3'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        }
      },
      credits: {
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#FFFFFF'
        }
      },

      drilldown: {
        activeAxisLabelStyle: {
          color: '#F0F0F3'
        },
        activeDataLabelStyle: {
          color: '#F0F0F3'
        }
      },

      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: '#505053'
          }
        }
      },

      // scroll charts
      rangeSelector: {
        buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
            color: '#CCC'
          },
          states: {
            hover: {
              fill: '#FFFFFF',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: '#000003',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            }
          }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },

      navigator: {
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        },
        xAxis: {
          gridLineColor: '#505053'
        }
      },

      scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
      },

      // special colors for some of the
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: '#505053',
      dataLabelsColor: '#B0B0B3',
      textColor: '#C0C0C0',
      contrastTextColor: '#F0F0F3',
      maskColor: 'rgba(255,255,255,0.3)'
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    Highcharts.setOptions({
      global: {
        useUTC: false // Coordinated Universal Time
      }
    });

    $('#container').highcharts({
      chart: {
        type: 'spline',
        zoomType: 'xy',
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
          load: function() {

            // Update chart every second
            var series = this.series[0];
            setInterval(function() {
              var x = (new Date()).getTime();
              device.analogRead(1, function(data) {
                data.return_value;
                series.addPoint([
                x, data.return_value
              ], true, true);
            });
          }, 1000);
          }
        }
      },
      title: {
        text: 'TEMPERATURA'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: '°C'
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#000'
          }
        ]
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [
        {
          name: 'value',
          data: (function() {
            // Array of random data
            var data = [],
            time = (new Date()).getTime(),
            i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.random()
              });
            }
              //x: time + i * 1000,
              // y: device.analogRead(0, function(data) {
              //   data.return_value;
              // data.push({
              //   })
              // });
              //y: Math.random()
            //};
            console.log(data)
            return data;

          }())
        }
      ]
    });
    });
  });
});
