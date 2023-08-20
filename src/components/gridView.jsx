import React, { useRef, useState, useEffect }  from "react";
import numberToWords from "number-to-words";
import { useNavigate } from "react-router-dom";

const ReactGridLayout = React.memo(({ columns, numBoxes }) => {
    const boxRefs = useRef([]);
    const intersectionObserver = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        intersectionObserver.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const boxNumber = Number(entry.target.dataset.boxNumber);
                const boxWord = numberToWords.toWords(boxNumber);
                console.log(`${boxWord} WAS CALLED`);
                intersectionObserver.current.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );
    
        boxRefs.current.forEach((boxRef) => {
          intersectionObserver.current.observe(boxRef);
        });
    
        
        return () => {
          if (intersectionObserver.current) {
            intersectionObserver.current.disconnect();
          }
        };
      }, []);
    
    


    const renderBoxes = () => {
        const boxes = [];

        for (let i = 0; i < numBoxes; i++) {
            const boxNumber = i + 1;
            const boxWord = numberToWords.toWords(boxNumber);
            boxes.push(
                <div key={i} className="box" style={{height:100,width:250,backgroundColor:"#00BFFF",position:"relative"}} 
                    ref={(ref) => (boxRefs.current[i] = ref)} data-box-number={boxNumber}>
                    <div className="box-text" style={{ position: 'absolute', top: '10px', left: '10px',color:"white",fontSize:"12px" }}>
                        {boxWord.toUpperCase()}
                    </div>
                </div>);
        }

        return boxes;
    };

    
    const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        overflow:'auto',
        padding: 20,
        minHeight: '100vh',
    };

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '15px',
        textAlign: 'top-left',       

    };
    const gridContainerStyles = {
        // width: '80%', 
        height: '100%', 
        overflow: 'auto', 
        justifyContent: 'center',
    };
    return (
        <>
            <button style={{ padding: '10px' }} onClick={() => navigate('/') }> go to Dashboard </button>
        <div style={containerStyles}>
            <h2>Grid View</h2>

            <div style={gridContainerStyles}>      
                <div style={gridStyles} >
                    {renderBoxes()}
                </div>
            </div>
        </div>
        </>
    )
})
export default ReactGridLayout;