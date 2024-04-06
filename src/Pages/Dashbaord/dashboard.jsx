import React, { useState, useEffect } from 'react';
import { Typography, Space, Card, Statistic } from 'antd';
import { DollarCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Update the path as per your project structure
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 600,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Jan: 59,
    Feb: 57,
    Mar: 86,
    Apr: 21,
  },
  {
    Jan: 50,
    Feb: 52,
    Mar: 78,
    Apr: 28,
  },
  {
    Jan: 47,
    Feb: 53,
    Mar: 106,
    Apr: 41,
  },
  {
    Jan: 54,
    Feb: 56,
    Mar: 92,
    Apr: 73,
  },
  {
    Jan: 57,
    Feb: 69,
    Mar: 92,
    Apr: 99,
  },
  {
    Jan: 60,
    Feb: 63,
    Mar: 103,
    Apr: 144,
  },
  {
    Jan: 59,
    Feb: 60,
    Mar: 105,
    Apr: 319,
  },
];

const valueFormatter = (value) => `${value}mm`;

function Dashboard() {
  const [totalAmount, setTotalAmount] = useState(0); // Initialize with appropriate initial value
  const [lastTransaction, setLastTransaction] = useState(); // Initialize with appropriate initial value

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'bank'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setTotalAmount(data.totalAmount);
          setLastTransaction(data.lastTransaction);
        });
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchFirestoreData();
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ color: 'blue' }}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <Card style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
          <Space direction="horizontal">
            <DollarCircleOutlined style={{ color: 'red' }} />
            <Statistic title="Total Amount" value={totalAmount} />
          </Space>
        </Card>
        <Card style={{ backgroundColor: 'rgba(128, 0, 128, 0.1)' }}>
          <Space direction="horizontal">
            <FieldTimeOutlined style={{ color: 'purple' }} />
            <Statistic title="Last Transaction" value={lastTransaction} />
          </Space>
        </Card>
      </Space>
      <BarsDataset />
    </Space>
  );
}

function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'Jan' }, { scaleType: 'band', dataKey: 'Feb' }, { scaleType: 'band', dataKey: 'Mar' }, { scaleType: 'band', dataKey: 'Apr' }]}
      series={[
        { dataKey: 'Jan', label: 'Jan', valueFormatter },
        { dataKey: 'Feb', label: 'Feb', valueFormatter },
        { dataKey: 'Mar', label: 'Mar', valueFormatter },
        { dataKey: 'Apr', label: 'Apr', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}

export default Dashboard;
