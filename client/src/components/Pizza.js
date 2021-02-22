import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { connect } from 'react-redux'
import './Pizza.css'


function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(function Pizza(props) {

    const [items, setItems] = useState([])

    const { user } = props
    const userId = user.id
    // const [file, setFile] = useState('')

    useEffect(function () {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'get',
            headers: myHeaders,
        };

        fetch("https://api.spoonacular.com/food/search?query=pizza&apiKey=d1c4cb5b163f4ce3a1e92a28c2f3a7f1", requestOptions)
            .then(response => response.json())
            .then((resJson) => {
                setItems(resJson.searchResults[0].results)
                console.log(resJson.searchResults[0].results)
                console.log(resJson)
                debugger
                console.log('p', resJson)
                // setItems(resJson.searchResults[0].results)
                console.log('users', items)
                console.log('items=', items)
            })
            .catch(error => console.log('error', error))

    }, []);

    function addRecipy(item) {

        debugger;
        const data = { "name": item.name, "content": item.content, "link": item.link, "image": item.image }

        console.log(user.name)
        console.log(user.password)

        fetch('http://localhost:3007/recipy/' + user.name + '/' + user.password, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        })
            .then((res) => res.json()).then((resJson) => {
                // setListPosts(resJson)
                alert('המתכון נוסף לרשימת המתכונים')
                console.log(resJson)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='row'>
                {/* <div class="container"> */}
                {
                    items[0] && items.map((item, index) =>
                        <div className='col-4'>

                            <div className='lll ' key={index}>
                                {/* w3-hover-opacity */}
                                {/*  */}
                                {/* width: 450, height: 850, border: '8px solid gray', marginLeft: 50, marginTop: 30 */}
                                <div classNames="item" id='card' style={{ width: '90%', height: '850px', border: '8px solid gray', marginLeft: '5%', marginTop: '5%' }} key={index}>
                                    {/* style={{ width: 400, height: 250 }} */}

                                    <img src={item.image} className="card-img-top  image" alt={item.name}></img><br></br>
                                    <div className="middle">
                                        <div class="text">
                                            <button className="btn" style={{ backgroundColor: 'rgb(41, 41, 102)', color: 'white' }} onClick={() => addRecipy(item)}>הוספה לספר מתכונים</button><br></br>

                                        </div>
                                    </div>
                                    <div classNames="card-body">
                                        <h3 className="card-title"><b>{item.name}</b></h3>
                                        {console.log('string', typeof (item.image))}
                                        <p className="card-text">{parse(item.content)}</p>
                                        <p className='btn btn-link'>{item.link}</p><br></br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            {/* </div> */}
            {/* <ul>
                {items[0] && items.map((item, index) => <li key={index}>{item.name}</li>)}
            </ul> */}

        </>
    )
})