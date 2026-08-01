import React, { useState } from 'react'
import Purchase from './Purchase'
import "./Options.css"

const Options = () => {
  const [purchaseModal, setPurchaseModal] = useState(false);

  return (
    <div className="options">
      <h2>
        Options
      </h2>
      <div className="options-individual">
        <div key="" className="option">
          <div className="option-info">
            <p className="option-info-p">
              Basic
            </p>
            <p className="option-info-p2">
              <span className="option-info-price">€49.99</span>
            </p>
            <ul>
              <li>✅ Basic home cleaning</li>
              <li>✅ Dusting and surface cleaning</li>
              <li>✅ Bathroom cleaning</li>
              <li>✅ Waste removal</li>
            </ul>
            <a
              href="#"
              className="option-purchase"
              onClick={(event) => {
                event.preventDefault();
                setPurchaseModal(true)
              }}
            >
              PURCHASE NOW
            </a>
          </div>
        </div>
        <div key="" className="option">
          <div className="option-info">
            <p className="option-info-p">
              Standard
            </p>
            <p className="option-info-p2">
              <span className="option-info-price">€89.99</span>
            </p>
            <ul>
              <li>✅ Everything in Basic</li>
              <li>✅ Deep cleaning services</li>
              <li>✅ Window cleaning</li>
              <li>✅ Office and commercial spaces</li>
              <li>✅ Flexible scheduling</li>
            </ul>
            <a
              href="#"
              className="option-purchase"
              onClick={(event) => {
                event.preventDefault();
                setPurchaseModal(true)
              }}
            >
              PURCHASE NOW
            </a>
          </div>
        </div>
        <div key="" className="option">
          <div className="option-info">
            <p className="option-info-p">
              Premium
            </p>
            <p className="option-info-p2">
              <span className="option-info-price">€149.99</span>
            </p>
            <ul>
              <li>✅ Everything in Standard</li>
              <li>✅ Eco-friendly cleaning products</li>
              <li>✅ Furniture and detailed cleaning</li>
              <li>✅ Full property maintenance</li>
              <li>✅ Priority customer support</li>
            </ul>
            <a
              href="#"
              className="option-purchase"
              onClick={(event) => {
                event.preventDefault();
                setPurchaseModal(true)
              }}
            >
              PURCHASE NOW
            </a>
          </div>
        </div>
      </div>
      {purchaseModal && <Purchase closeModal={setPurchaseModal} />}
    </div>
  )
}

export default Options