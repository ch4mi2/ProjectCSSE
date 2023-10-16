import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const AnalyticsChart = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/api/orders/analytics/');
      const data = await response.json();

      console.log(data);

      const xData = [];
      const yData = [];

      data.forEach((item) => {
        xData.push(item.site === '' ? 'Others' : item.site);
        yData.push(item.totalAmount);
      });
      setXData(xData.splice(0, 10));
      setYData(yData.splice(0, 10));
    };
    fetchData();
    setLoading(false);
  }, []);

  const option = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        formatter: function (value) {
          return value.length > 10 ? value.substr(0, 10) + '...' : value;
        },
      },
      name: 'Sites',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          return 'Rs. ' + value.toLocaleString('en-UN');
        },
      },
      name: 'Purchase Expenses(Rs)',
    },

    series: [
      {
        data: yData,
        type: 'bar',
        barMaxWidth: 60,
        itemStyle: {
          color: '#f4ca40',
        },
      },
    ],
  };
  return (
    <div className="w-11/12 mt-16">
      {loading && <LoadingScreen />}
      <ReactEcharts
        option={option}
        style={{
          height: '450px',
          width: '100%',
        }}
      />
    </div>
  );
};

export default AnalyticsChart;
