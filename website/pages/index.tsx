import Head from 'next/head'
import styles from '../styles/Home.module.css'
// @ts-ignore
import allData from '../data/all-data.json5'
import {Col, Divider, Layout, Radio, RadioChangeEvent, Row, Space, Table, Tag} from 'antd'
import {useEffect, useState} from 'react'
import {i18n} from "../utils/i18n";
import { LinkOutlined } from '@ant-design/icons'
import GitHubButton from 'react-github-btn'
const { Header, Footer, Content } = Layout;
const lang = 'en-us'
export default function Home() {
  const [vendor, setVendor] = useState('')
  const [productListFiltered, setProductListFiltered] = useState([])
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setVendor(e.target.value);
  };
  const YNTag = (yn: boolean) => {
    return yn ? <Tag color="green">Support</Tag> : <Tag color="red">No Support</Tag>
  }
  const cpuVendorTag = (vendorName: string) => {
    return {
      'AMD': <Tag color="red">{vendorName}</Tag>,
      'INTEL': <Tag color="blue">{vendorName}</Tag>,
    }[vendorName.toUpperCase()]
  }
  const othersList = (others: any) => {
    return (<div><div>Others : </div>{others.map((item: any) => {
      return <div key={item.link}><Tag color="orange">{i18n(item.text)}</Tag><a href={item.link} target="_blank" rel="noreferrer"><LinkOutlined  /></a></div>
    })}</div>)
  }
  const columns = [
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Model',
      key: 'model',
      render: (record: any) => {
        console.log(record)
        return <div>
          {record.model} <Space /> {record.cpuVendor && cpuVendorTag(record.cpuVendor)}
        </div>
      }
    },
    {
      title: 'Default Support S3',
      dataIndex: 'default_support_s3',
      key: 'default_support_s3',
      render: (record: boolean) => {
        return YNTag(record)
      }
    },
    {
      title: 'Can Open S3 By Manual',
      dataIndex: 'can_open_s3_by',
      key: 'can_open_s3_by',
      render: (record: any) => {
        if (!record.user_interface_settings && !record.regedit && !record.bios_settings && !record.bios_settings && !(record.others && record.others.length)) {
          return YNTag(false)
        } else {
          return <div>
            <div>Settings : {YNTag(record.user_interface_settings)}</div>
            <div>RegEdit : {YNTag(record.regedit)}</div>
            <div>BIOS Settings : {YNTag(record.bios_settings)}</div>
            <div>Flash BIOS : {YNTag(record.bios_settings)}</div>
            {record.others && record.others.length ?
              <div>{othersList(record.others)}</div>
              : null
            }
          </div>
        }
      }
    },
    {
      title: 'Offical Page',
      dataIndex: 'offical_page',
      key: 'offical_page',
      render: (record: any) => {
        return <a href={i18n(record)}><LinkOutlined/></a>
      }
    }
  ]
  // 监听 vendor 的变化，更新 productListFiltered
  useEffect(() => {
    const filtered = vendor ? allData.products.filter((product: any) => {
      return product.vendor.toUpperCase() === vendor.toUpperCase()
    }) : allData.products
    console.log({filtered})
    setProductListFiltered(filtered)
  }, [vendor])
  const vendorOptions = allData.vendors.map((vendor: any) => {
    return (
      <Radio key={vendor} value={vendor}>{vendor}</Radio>
    )
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Give The S3 Back</title>
        <meta name="description" content="Windows Vendors, Give The S3 Sleep Mode Back!"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
        <link rel="icon" href="/favicon.ico"/>
        {/*<script async defer src="https://buttons.github.io/buttons.js"></script>*/}
      </Head>
      <Layout>
        <Header style={{backgroundColor: '#eee', height: '0'}}>
          <Row >
            <Col span={20}></Col>
            <Col span={4} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} >
              <GitHubButton href="https://github.com/wzdxy/give-the-s3-back">Star</GitHubButton>
            </Col>
          </Row>
        </Header>
        <Content>
          <div >
            <p className={styles.mainTitle}>Windows Vendors, Give The S3 Sleep Mode Back!</p>
            <p className={styles.subTitle}>Modern standby may be good, but there should be a choice.</p>
          </div>
          <div className={styles.filterBox}>
            <Radio.Group onChange={onChange} value={vendor} optionType="button" buttonStyle="solid">
              {/*<Space direction="vertical">*/}
              <Radio value={""}>All</Radio>
              {vendorOptions}
              {/*</Space>*/}
            </Radio.Group>
          </div>
          <Divider />
          <Table scroll={{x: true}} columns={columns} dataSource={productListFiltered}></Table>
        </Content>
        <Footer></Footer>
      </Layout>

    </div>
  )
}
