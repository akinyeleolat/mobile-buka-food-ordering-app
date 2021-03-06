[![Build Status](https://travis-ci.com/akinyeleolat/mobile-buka-food-ordering-app.svg?branch=develop)](https://travis-ci.com/akinyeleolat/mobile-buka-food-ordering-app)
[![Coverage Status](https://coveralls.io/repos/github/akinyeleolat/mobile-buka-food-ordering-app/badge.svg?branch=develop)](https://coveralls.io/github/akinyeleolat/mobile-buka-food-ordering-app?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e8a5b970ff56ec88d1bb/maintainability)](https://codeclimate.com/github/akinyeleolat/mobile-buka-food-ordering-app/maintainability)
# mobile-buka-food-ordering-app

# Description
Mobile Buka Food Ordering App is an online food ordering app which allow users to order for food and choose a pick up options

# Table of Contents
<ul>
            <li>
                <a href="#Technologies">Technologies</a>
            </li>
            <li>
                <a href="#Features">Features</a>
            </li>
          <li>
                <a href="#Installations">Installation</a>
            </li>
        </ul>
        
# Technologies
Currently,
<ul>
<li> HyperText Mark-up Language (HTML) </li>
<li>Cascade Style Sheet (CSS)</li>
<li>Vanilla Javascript</li>
<li>PostgreSQL Database(raw SQL):</li>
<li>Nodejs (Express framework)</li>
  </ul>
  
# Pivotal Tracker
Mobile Buka Food ordering app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is (https://www.pivotaltracker.com/n/projects/2197652)

# API Enpoint
API Endpoints is hosted at (https://mobile-buka.herokuapp.com/)

# UI Templates
The application is hosted online on gh-pages with [Mobile Buka] (https://akinyeleolat.github.io/mobile-buka-food-ordering-app/UI/)

# API Documentation
to be added later

# Features
Currently,
<ul>
<li>Create Order</li>
<li>Add Order Items</li>
<li>Update Order Status as Either Accepted or Rejected</li>
<li>Complete an order</li>
<li>Get Order</li>
<li>Get Selected Order</li>
  </ul>

# Getting Started
# Installation
install POSTMAN app
run npm run start then navigate to localhost:3000 on POSTMAN
# API Endpoint Route
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/orders/</td>
    <td>Create An Order</td>
  </tr>
   <tr>
    <td>PUT</td>
    <td>api/v1/orders/orderId</td>
    <td>Update order status as Accepted</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/orders/</td>
    <td>Get all order</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>api/v1/orders/orderId</td>
    <td>Get selected order</td>
  </tr>
  </table>
  
# Author
Akinyele Oluwatosin
# ScreenShot
<img width="1440" alt="Screenshot 2019-09-19 at 10 56 05 AM" src="https://user-images.githubusercontent.com/19696366/65234356-51149e00-dacc-11e9-99aa-758005d5c2d0.png">
