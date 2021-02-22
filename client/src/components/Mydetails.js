import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import parse from 'html-react-parser'
import MDEditor from '@uiw/react-md-editor';
import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from 'react-router-dom';


// פונקצייה שמביאה נתונים מהרידקס
function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(function Mydetails(props) {

    const history = useHistory()

    const modules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                    { align: [] }
                ],

            ],
        },
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "size",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "align"
    ];

    const { user } = props

    const [items, setItems] = useState([])

    const [name, setName] = useState('')
    const [name1, setName1] = useState('')
    const [content, setContent] = useState('')
    const [content1, setContent1] = useState('')
    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [alt, setAlt] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        getAllRecipy()

    }, [])

    // פונקצייה שמביאה לכל אדם את כל המתכונים שבחר, באמצעות שם משתמש וסיסמא
    function getAllRecipy() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', localStorage.getItem('token'))

        debugger;
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:3007/user/recipyByUser/${user.name}/${user.password}`, requestOptions)
            .then(response => response.json()
            )
            .then(result => {
                console.log(result.recipy.recipy)
                setItems(result.recipy.recipy)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    // פונקצייה שמוחקת מתכון מרשימת המתכונים שלי
    function removeRecipy(item) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', localStorage.getItem('token'))


        debugger;
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:3007/recipy/${item._id}/${user.name}/${user.password}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                debugger
                // alert('המתכון נמחק')
                console.log(result)
                getAllRecipy()
            })
            .catch(error => {
                alert('המתכון לא נמחק')
                console.log('error', error)

            })
    }

    // פונקצייה שמעדכנת מתכון
    function updateRecipy(item) {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append('Authorization', localStorage.getItem('token'))


        const urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("content", content);
        urlencoded.append("link", item.link);
        urlencoded.append("image", image);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`http://localhost:3007/recipy/${id}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // alert('המתכון עודכן בהצלחה')
                console.log(result)
                console.log(item._id)

                getAllRecipy()
            })
            .catch(error => console.log('error', error));

    }

    // פונקצייה שמאתחלת את הנתונים- כדי שאוכל לעדכן
    function setItemsToName(id, name, content, image) {
        console.log('id', id)
        setId(id)
        setName(name)
        console.log(name)
        setContent(content)
        console.log(content)
        setImage(image)
        setAlt(name)
    }

    // פונקצייה שמוסיפה מתכון- מתכון חדש- בלי קשר למתכונים הרשומים
    function addRecipy() {
        debugger;
        const data = { "name": name1, "content": content1, "image": image1, "link": '' }

        console.log(user.name)
        console.log(user.password)

        fetch('http://localhost:3007/recipy/' + user.name + '/' + user.password, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ data })
        })
            .then((res) => res.json()).then((resJson) => {
                // setListPosts(resJson)
                // alert('המתכון נוסף לרשימת המתכונים')
                console.log(resJson)
                getAllRecipy()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {/* //פתיחת מודל שמבצע הוספה של מתכון */}
            <button type="button" id='kkk' style={{ backgroundColor: 'gray', border: '3px solid rgb(41, 41, 102)', color: 'white', width: '40%', fontSize: '110%' }} className="btn vvv" data-toggle="modal" data-target="#exampleModal">
                יצירת מתכון
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <input type='text' value={image1} onChange={(e) => setImage1(e.target.value)} placeholder='הכנס קישור לתמונה'></input>
                            {/* <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5> */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* {name = item.name} */}
                            <input type='text' placeholder='הכנס שם מתכון' onChange={(e) => setName1(e.target.value)} value={name1}></input><br></br><br></br>
                            {/* תיבת טקסט- לכתיבת תוכן המתכון */}
                            <ReactQuill
                                onRef={() => (this.quillRef = '')}
                                value={content1}
                                onChange={setContent1}
                                placeholder='הכנס תוכן מתכון'
                                // onKeyUp={this.onKeyUp}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                            ></ReactQuill>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ביטול</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addRecipy}>הוספת המתכון</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ================================================================= */}


            {/* <p>hello</p> */}
            {/* הצגה של כל המתכונים ששייכים אלי */}
            <div className="row">
                {
                    items[0] && items.map((item, index) =>
                        <div className='col-4'>
                            <div className='lll' key={index} >


                                <div classNames="item" id='card' style={{ width: '90%', height: '850px', border: '8px solid gray', marginLeft: '5%', marginTop: '5%' }} key={index}>
                                    <img src={item.image} className="card-img-top" alt={item.name}></img>
                                    <div className="card-body">
                                        {/* <h5>id: {item._id}</h5> */}
                                        <h5 className="card-title">{item.name}</h5>
                                        {console.log('string', typeof (item.image))}
                                        <p className="card-text">{parse(item.content)}</p>
                                        <p className='btn btn-link'>{item.link}</p>


                                        <div className="middle">
                                            <div classNames="text">
                                                <button id='del' className="btn" title='מחיקת המתכון מרשימת המתכונים' style={{ backgroundColor: 'rgb(41, 41, 102)', color: 'white' }} onClick={() => removeRecipy(item)}>
                                                    {/* מחיקה מהספר מתכונים */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </button>

                                                <button type="button" title='עדכון המתכון' style={{ backgroundColor: 'rgb(41, 41, 102)', color: 'white' }} onClick={() => setItemsToName(item._id, item.name, item.content, item.image)} className="btn" data-toggle="modal" data-target="#staticBackdrop">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                    {/* עדכון המתכון */}
                                                </button>
                                            </div>
                                        </div>

                                        {/* ====================================================================== */}
                                        {/* כאן המודל של עדכון המתכון */}


                                        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <img src={image} ></img>

                                                        {/* <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5> */}
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <input type='text' onChange={(e) => setName(e.target.value)} value={name}></input><br></br><br></br>

                                                        <ReactQuill
                                                            onRef={() => (this.quillRef = '')}
                                                            value={content}
                                                            onChange={setContent}
                                                            theme="snow"
                                                            modules={modules}
                                                            formats={formats}
                                                        ></ReactQuill>
                                                    </div>
                                                    <div classNames="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">ביטול</button>
                                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => updateRecipy(item)}>עדכן</button><br></br>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* <ul>
                {items[0] && items.map((item, index) => <li key={index}>{item.name}</li>)}
            </ul> */}
            {/* https://github.com/firebase/firebase-js-sdk/tree/master/.vscode */}

        </>
    )
})