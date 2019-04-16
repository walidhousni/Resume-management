import React, { Component } from 'react';
import {Radar} from 'react-chartjs-2';

class ScoreRadar extends Component {
    render() {
        const { score } = this.props
        const data = {
          labels: ['Dev', 'Front', 'Back', 'BI', 'Big-Data', 'DB', 'Design', 'Dev-Ops', 'Scrum'],
          datasets: [
            {
              label: 'Score',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [
                score[0].scoreDev,
                score[0].scoreFront,
                score[0].scoreBack,
                score[0].scoreBI,
                score[0].scoreBigData,
                score[0].scoreDB,
                score[0].scoreDesign,
                score[0].scoreDevOps,
                score[0].scoreScrum
              ]
            }
          ]
        };
        return (
            <div className='score-radar' >
                <Radar
                  data={data}
                  options={{
                    tooltips: {
                      yAlign: 'above',
                      callbacks: {
                          title: function(tooltipItem, data) {
                              return '';
                          },
                          label: function(tooltipItem, data) {
                              return data.labels[tooltipItem.index] + ": " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          }
                      }
                    },
                    legend: {
                      display: false
                    }
                  }}
                />
            </div>
        )
    }
}

export default ScoreRadar;