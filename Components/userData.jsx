// ContactInfo.js
import React from 'react';
import styles from '../styles/ContactInfo.module.css'; // Make sure the path is correct

const SkeletonLoader = () => (
  <div className="skeletonLoader"></div>
)

const ContactInfo = ({ data, loading}) => {
  
  return (
    <div style={{marginLeft: 50}} className={styles.container}>
      {loading ? (
        <>
          <div className="row">
              <div className="card__skeleton card__title" ></div>
              <div className="card__skeleton card__title" style={{marginLeft: 30}}></div>
              </div>

            <div className="row" style={{marginTop: 20}}>
              <div className="card__skeleton card__title"></div>
              <div className="card__skeleton card__title"style={{marginLeft: 30}}></div>
              </div>
        </>
      ) : (
        data.map((item, index) => {
          // Skip rendering here if the value is null or if the index is odd (because the odd items will be rendered with the even ones)
          if (!item.value || index % 2 !== 0) return null;
  
          return (
            <div className={styles.row} key={index} style={{width: 500}}>
              {/* Left item */}
              <div className={styles.itemLeft}>
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span>{item.value}</span>
              </div>
  
              {/* Right item - check if it exists and has a value */}
              {data[index + 1] && data[index + 1].value && (
                <div className={styles.itemRight} style={{marginLeft: 30}}>
                  {data[index + 1].icon && <span className={styles.icon}>{data[index + 1].icon}</span>}
                  <span>{data[index + 1].value}</span>
                </div>
              )}
            </div>
          );
        })
      )}
      
    </div>
  );
};


export default ContactInfo;
