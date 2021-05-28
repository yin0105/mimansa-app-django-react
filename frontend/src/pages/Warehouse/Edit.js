import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'mdbreact/dist/css/mdb.css'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { IoMdTrash } from "react-icons/io";
import { MdDoneAll } from "react-icons/md";
import { TiPencil, TiUpload, TiArrowSync } from "react-icons/ti";
import {MDBCard, MDBInput, MDBCol, MDBContainer, MDBRow, MDBBtn,MDBIcon,MDBCardBody } from 'mdbreact';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // setting the initial states
        this.state = {
            id: '',
            title: '',
            message: '',
            postList: [],
            isLoading: true
        }
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    getPost() {
        axios.get(`http://127.0.0.1:8000/api/posts/` + `/${this.state.id}/`)
            .then(res => {
                console.log(res)
                this.setState({
                    postList: res.data,
                    isLoading: false
                });
            })
    }

    componentDidMount() {
        this.getPost();
    }

    reset = () => {
        this.setState({
            id: '',
            title: '',
            message: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            message: this.state.message

        };

        axios.post('http://127.0.0.1:8000/api/posts/', obj)
            .then(res => {
                ToastsStore.success('Successfully Saved!');
                //this.getPost();
            });

        this.setState({
            id: '',
            title: '',
            message: ''

        })
    }



    render() {
        const { isLoading, postList } = this.state;

        return (
            <div

            >


                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="3">

                        </MDBCol>
                        <MDBCol md="6">
                            <form onSubmit={this.onSubmit}>
                                <p className="h4 text-center mb-4">Enter Information</p>
                                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="defaultFormLoginEmailEx"
                                    className="form-control"
                                    onChange={this.onChangeTitle}
                                    value={this.state.title}
                                />
                                <br />
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Message
                                </label>
                                <input
                                    type="text"
                                    id="defaultFormLoginPasswordEx"
                                    className="form-control"
                                    value={this.state.message}
                                    onChange={this.onChangeMessage}
                                />
                                <div className="text-center mt-4">
                                    <MDBBtn color="indigo" type="submit">Login</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                        <MDBCol md="3">

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <ToastsContainer store={ToastsStore} />




            </div>
        );
    }
}