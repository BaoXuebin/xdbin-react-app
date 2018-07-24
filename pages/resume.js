import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Divider, Icon } from 'semantic-ui-react';

import AboutmeStore from '../src/lab/store/AboutmeStore';
import Layout from '../src/blog/container/Layout';

class Resume extends Component {
    static getInitialProps() {
        const global = {
            logo: {
                name: 'heartbeat',
                text: '简历'
            },
            title: '简历'
        };
        return { global };
    }

    render() {
        return (
            <div style={{ margin: '1rem 0' }}>
                <h3>基本信息</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="user" /> 包学斌</p>
                    <p><Icon name="birthday cake" /> 1995.09</p>
                    <p><Icon name="home" /> 河南省扶沟县</p>
                    <p><Icon name="university" /> 东北大学(秦皇岛校区) [本科][2012.09 - 2016.06]</p>
                    <p><Icon name="student" /> 信息与计算科学 [理学学士]</p>
                </div>
                <h3>期望薪资</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="trophy" /> 13 - 15K</p>
                </div>
                <h3>联系方式</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="phone" /> 159-2124-7904</p>
                    <p><Icon name="mail" /> baoxbin@hotmail.com</p>
                    <p><Icon name="globe" /> <a href="https://xdbin.com">https://xdbin.com</a></p>
                    <p><Icon name="github" /> <a href="https://github.com/BaoXuebin">BaoXuebin</a></p>
                </div>
                <h3>技术栈</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="code" /> 熟悉 Java 面向对象编程，了解 Java 多线程、JMM、文件流操作等。</p>
                    <p><Icon name="leaf" /> 精通基于 Java 的 Web 应用开发，熟悉 Spring，SpringMVC，Hibernate(Mybatis)。熟练使用 Spring Boot 搭建 Web 开发框架，并快速开发使项目落地。了解 Spring Cloud 微服务架构，有前后端分离项目开发经验。</p>
                    <p><Icon name="js" /> 熟悉 HTML、CSS、JavaScript，有较为丰富的使用经验。熟悉 jQuery，ES6 语法和常见的前端开发工具(npm，webpack等)。</p>
                    <p><Icon name="react" /> 熟悉 React 系列前端开发框架，有较为丰富的使用经验。了解基于 NextJS 的后端渲染方案，熟悉 create-react-app 脚手架和 semantic-ui，antd 组件库的使用。可以快速搭建前端开发环境，并实施开发。</p>
                    <p><Icon name="linux" /> 了解 Linux 常见命令和基本使用，有相关部署和维护经验。熟悉 MySQL 的使用，了解常见的设计规范和调优方法。了解 Python 语言的使用，有简单爬虫开发经验。</p>
                </div>
                <h3>工作经历</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="building" /> 万达信息股份有限公司(上海)</p>
                    <div style={{ margin: '0 1.5rem' }}>
                        <p><Icon name="time" /> 2016.07 - 2018.03</p>
                        <p><Icon name="coffee" /> Java 软件开发工程师</p>
                    </div>
                    <Divider />
                    <p><Icon name="building" /> 上海链家</p>
                    <div style={{ margin: '0 1.5rem' }}>
                        <p><Icon name="time" /> 2018.04 - 至今</p>
                        <p><Icon name="coffee" /> Java 软件开发工程师</p>
                    </div>
                </div>
                <h3>项目经验</h3>
                <Divider />
                <div style={{ margin: '0 1.5rem' }}>
                    <p><Icon name="eye" /> 全国信用信息公示系统 (万达信息)</p>
                    <div style={{ margin: '0 1.5rem' }}>
                        <p>工商局对经营主体经营信息，处罚公示的网站。整个系统采用 Spring + SpringMVC + Hibernate 的后端技术架构。部分业务根据具体情况采用 Ajax + RESTful API 的方式实现，
                            后端利用 Spring Cache 实现缓存功能。页面使用了 jsp 完成，利用 jQuery 简化了前端交互逻辑开发，增强兼容性。项目集成了短信发送、智能验证、邮件发送等功能。
                            这个项目大大加深了对 Spring 系列框架的理解和生产使用，也熟悉了 jQuery 插件化开发和各浏览器兼容性的差异。</p>
                    </div>
                    <Divider />
                    <p><Icon name="search" /> 内容效果监测平台 (上海链家)</p>
                    <div style={{ margin: '0 1.5rem' }}>
                        <p>此项目主要用于监测链家 app 客户端各模块流量比较和统计。此项目采用前后端分离的开发模式；后端使用 SpringBoot 提供接口服务，前端使用 create-react-app + antd 完成单页面应用的开发。
                            其中使用 echarts 用于图表的展示，并适当的使用前端存储用于优化性能。通过这个项目的开发，深刻认识到前后端分离的高效性，以及 React 组件化、轻量化的开发模式，前端路由加页面异步加载的使用，
                            也使得产品有了良好的用户体验。</p>
                    </div>
                    <Divider />
                    <p><Icon name="map" /> 商圈划分系统 (上海链家) [完成度 1/3]</p>
                    <div style={{ margin: '0 1.5rem' }}>
                        <p>此项目主要用于链家运营团队对于楼盘商圈的划分和商圈内信息的比较。主要技术栈和 内容效果监测平台 项目相同，楼盘划分部分引入了高德地图。
                            通过查阅其开放文档，实现了商圈的绘制(地图多边形)、海量楼盘(门店)的位置显示、以及楼盘图标的定制化。通过这个项目，进一步印证了前后端分离的敏捷化开发方式，对项目的快速落地打下来基础。</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRedux(AboutmeStore, null, null)(Layout(Resume));
