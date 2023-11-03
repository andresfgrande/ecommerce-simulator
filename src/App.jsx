import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenerateLoyalty from './components/GenerateLoyalty';
import "./styles/GenerateLoyalty.css"
import GeneratePurchase from './components/GeneratePurchase';
import "./styles/GeneratePurchase.css"

function App() {
  
  return (
    <>
      <h1>Ecommerce simulator</h1>
      <GenerateLoyalty></GenerateLoyalty>
      <GeneratePurchase></GeneratePurchase>
    </>
  )
}

export default App
