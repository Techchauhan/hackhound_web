import {
  DollarCircleOutlined,
  AccountBalanceWalletOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FieldTimeOutlined, // Correct icon for 'Expenses' from Ant Design Icons
} from "@ant-design/icons";

import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ color: "blue" }}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={<CurrencyRupeeIcon style={{ color: "green" }} />}
          title={"Total Income"}
          value={orders}
          cardColor="rgba(0, 255, 0, 0.1)"
        />
        <DashboardCard
          icon={<AccountBalanceWalletIcon style={{ color: "blue" }} />}
          title={"Total Balance"}
          value={inventory}
          cardColor="rgba(0, 0, 255, 0.1)"
        />
        <DashboardCard
          icon={<FieldTimeOutlined style={{ color: "purple" }} />}
          title={"Expenses"}
          value={customers}
          cardColor="rgba(128, 0, 128, 0.1)"
        />
        <DashboardCard
          icon={<DollarCircleOutlined style={{ color: "red" }} />}
          title={"Revenue"}
          value={revenue}
          cardColor="rgba(255, 0, 0, 0.1)"
        />
      </Space>
      <DashboardChart />
    </Space>
  );
}

function DashboardCard({ title, value, icon, cardColor }) {
  return (
    <Card style={{ backgroundColor: cardColor }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return cart.date; // Assuming the date is available in the response
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const backgroundColors = data.map((_, index) => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Dates",
            data,
            backgroundColor: backgroundColors,
          },
        ],
      };

      setRevenueData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
