import './App.css';
import Timer from './Timer';
import { useState ,useEffect } from 'react';

function App() {

  const [CompleteOrder, setCompleteOrder] = useState(0);

  const [orderId ,setOrderId] = useState(1);

  const [orders, setOrders] = useState([]);

  const [minutes, setMinutes] = useState(0);

  const [formData, setFormData] = useState({
    orderId: 1,
    stage: "Order Placed",
    type: '',
    size: '',
    base: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orders.length >= 10) {

      alert("We are not taking orders now");
    }
    else {
    
      setOrderId((orderId) => orderId + 1)
     
      setOrders(orders => ([...orders, formData]));
    }
  };

  useEffect(() => {

    setFormData((prevFormData) => ({ ...prevFormData, orderId: orderId }));

  }, [orderId , setFormData ]);


  const stageChange = (e, id) => {

    const newData = [...orders];

    const index = orders.findIndex(item => item.orderId === id);

    if (newData[index].stage === "Order Placed") {
      newData[index].stage = "Order In Making";
    } else if (newData[index].stage === "Order In Making") {
      newData[index].stage = "Order Ready";
    } else if (newData[index].stage === "Order Ready") {
      newData[index].stage = "Order Picked";

      setCompleteOrder(CompleteOrder + 1);
    }

    setOrders(newData);
  };

  const orderCancel = (e, id) => {

    const newData = [...orders];

    const index = orders.findIndex(item => item.orderId === id);

    newData.splice(index, 1);

    setOrders(newData);

  }

  return (
    <div className="App">

      <p style = {{fontSize: '23px' , marginRight: '310px' ,marginTop: '20px'}}> Please place the order </p>
      <form onSubmit={handleSubmit}>
        <div className='outer-form' >
          <div className='form-level'>
            <label>Types</label>
            <select name="type" value={formData.type} onChange={(e) => handleChange(e)}>
              <option>Types</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className='form-level' >
            <label>Size</label>
            <select name="size" value={formData.size} onChange={(e) => handleChange(e)}>
              <option>Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className='form-level'>
            <label>Base</label>
            <select name="base" value={formData.base} onChange={(e) => handleChange(e)}>
              <option>Base</option>
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </div>
        </div>
        <input value={'Order Now' } type="submit" />

      </form>

      <div className='row order-stages ' >
        
      <p  style = {{ fontWeight:'bold' , fontSize: '20px' ,display : 'flex' }}>Order Stages</p>
        <div className='col ' >
          <p>Order Placed</p>
          {
            orders.map((data, index) => {
              return (
                <div key={index} >
                  {data.stage === "Order Placed" ?
                    <div className='cards-design' style={{ backgroundColor: minutes >= 1 ? 'red' : 'white' }} >

                      <p>Order No. {data.orderId}</p>

                      <div className="timer-container">
                        <div >
                          <Timer onTimerComplete = {setMinutes} />
                        </div>
                      </div>

                      <button onClick={(e) => stageChange(e, data.orderId)}> Next</button>

                    </div>
                    : " "
                  }
                </div>
              )
            })
          }

        </div>
        <div className='col'>
          <p>Order in Making</p>
          {
            orders.map((data, index) => {
              return (
                <div key={index}>
                  {data.stage === "Order In Making" ?
                    <div  className='cards-design' style={{ backgroundColor: minutes >= 1 ? 'red' : 'white' }}>

                      <p>Order No. {data.orderId}</p>

                      <div className="timer-container">
                        <div >
                          <Timer onTimerComplete = {setMinutes} />
                        </div>
                      </div>

                      <button onClick={(e) => stageChange(e, data.orderId)}> Next</button>

                    </div>
                    : " "
                  }
                </div>
              )
            })
          }
        </div>

        <div className='col'>
          <p>Order Ready</p>
          {
            orders.map((data, index) => {
              return (
                <div key={index}>
                  {data.stage === "Order Ready" ?
                    <div  className='cards-design' style={{ backgroundColor: minutes >= 1 ? 'red' : 'white' }}>

                      <p>Order No. {data.orderId}</p>

                      <div className="timer-container">
                        <div >
                          <Timer onTimerComplete={setMinutes} />
                        </div>
                      </div>

                      <button onClick={(e) => stageChange(e, data.orderId)}> Next</button>

                    </div>
                    : " "
                  }
                </div>
              )
            })
          }
        </div>

        <div className='col'>
          <p>Order Picked</p>
          {
            orders.map((data, index) => {
              return (
                <div key={index}>
                  {

                    data.stage === "Order Picked" ?
                      <div  className='cards-design'>

                        <p>Order No. {data.orderId}</p>
                        <p> picked</p>

                      </div>
                      : " "
                  }
                </div>
              )
            })
          }
        </div>
      </div>

    
      <div className='Main-Section'>
      <p  style = {{fontWeight:'bold',fontSize: '20px' ,display : 'flex'}}> Main Section </p>
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Stage</th>
              <th>Total Time Spend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((row, index) => {
              return (
                <tr key={index}>
                  <td>Order No. {row.orderId}</td>
                  <td>{row.stage}</td>
                  {row.stage === "Order Picked" ? <td></td> :
                    <td><Timer /></td>}
                  {row.stage === "Order Picked" ? <td></td> :
                    <td><button onClick={(e) => orderCancel(e, row.orderId)}>Cancel Order</button></td>
                  }
                </tr>
              )
            })}
            <tr>
              <td style={{ fontWeight: "bold" }}>Total order delivered</td>
              <td> {CompleteOrder}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
