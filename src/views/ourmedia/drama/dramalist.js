import React from 'react';
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Input,
    Row,
} from 'reactstrap';
import  data from './dramas.json';
import { AppSwitch } from '@coreui/react';
import './drama.css';

class dramaList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            infinitedata: data.dramas,
            data: data.dramas,
            asc: 'asc',
            enable: 'asc',
            modal: false,
            deleteindex: null,
            filterdata:null,
            editindex: null,
            justastate:null,
            editName: null,
            delete:null,
            fdelete:null,
            activePage: 1,
            wholedata:[],
            currentPage:1,
            disprev: "disabled",
            disnext: "ok",
            active1: "active",
            active2: "ok",
            active3: "ok",
            active4: "ok",
            activepage:1,
            selectrows:"",
            selectedrows:[]
        };
    }
    selectallrows(){
        if(this.state.selectrows===""){
            this.setState({selectrows:'backblue', selectedrows: this.state.infinitedata})
        }else{
            this.setState({selectrows:'', selectedrows: []})
        }
    }
    selectOneRow(val){
        this.setState({selectrows:'backblue', selectedrows: this.state.infinitedata[val]});

    }
    pagenum(val){
        switch(val){
            case "prev":
                if(this.state.active1 !== "active"){
                    this.setState({activepage: this.state.activepage-1});
                    this.pagenumbering(this.state.activepage-1);
                }
                break;
            case "next":
                if(this.state.active4 !== "active"){
                    this.setState({activepage: this.state.activepage+1});
                    this.pagenumbering(this.state.activepage+1);
                }
                break;
        }
    }
    pagenumbering(number){
        switch(number){
            case 1:
            let newarray=[];
            for(let i=0; i< 4; i++){
                newarray.push(this.state.wholedata[i])
            }
            this.setState({data: newarray, active1:"active", active2:"none",active3:"none",active4:"none",
            disprev:"disabled",disnext:"ok", activepage:1});
            break;
        case 2:
            let newarray2=[];
            for(let i=4; i< 8; i++){
                newarray2.push(this.state.wholedata[i])
            }
            this.setState({data: newarray2, active1:"none", active2:"active",active3:"none",active4:"none",
            disprev:"ok",disnext:"ok",activepage:2});
            break;
        case 3:
            let newarray3=[];
            for(let i=8; i< 12; i++){
                newarray3.push(this.state.wholedata[i])
            }
            this.setState({data: newarray3, active1:"nnone", active2:"none",active3:"active",active4:"none",
            disprev:"ok",disnext:"ok", activepage:3});
            break;
        case 4:
            let newarray4=[];
            for(let i=12; i< 16; i++){
                newarray4.push(this.state.wholedata[i])
            }
            this.setState({data: newarray4, active1:"none", active2:"none",active3:"none",active4:"active",
            disprev:"ok",disnext:"disabled",activepage:4});
            break;
        }
    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});

      }

    componentDidMount(){
        let newdata= this.state.infinitedata.sort((a, b) => {
             a.dramaName= a.dramaName.toLowerCase();
            b.dramaName = b.dramaName.toLowerCase();
            return (a.dramaName < b.dramaName) ? -1 : (a.dramaName > b.dramaName) ? 1 : 0;
        });
        let x = this.state.data.length;
        let y= x/4;
        this.setState({wholedata: newdata});
        let stpag =[];
        for(let i =0;i<4; i++){
                stpag.push(newdata[i]);
        }
        this.setState({data: stpag});
        let datar= this.state.data;
        
    }
    toggleDanger(value) {
        this.setState({modal: !this.state.modal,deleteindex: value});
    }

    enablesort(){
        if(this.state.data){
            if(this.state.enable === 'asc'){
                let newdata= this.state.infinitedata.sort(function(a,b){return a.detail.enable - b.detail.enable});
                console.log("enable sort", newdata);
                this.setState({data: newdata, enable: 'desc'});
            }
            else if(this.state.enable === 'desc'){
                let newdata= this.state.infinitedata.reverse(function(a,b){return a.detail.enable - b.detail.enable});
                console.log("enable sort", newdata);
                this.setState({data: newdata, enable: 'asc'});
            }
        }
        if(this.state.filterdata){
            if(this.state.enable === 'asc'){
                let newdata= this.state.filterdata.sort(function(a,b){return a.detail.enable - b.detail.enable});
                console.log("enable sort", newdata);
                this.setState({filterdata: newdata, enable: 'desc'});
            }
            else if(this.state.enable === 'desc'){
                let newdata= this.state.filterdata.reverse(function(a,b){return a.detail.enable - b.detail.enable});
                console.log("enable sort", newdata);
                this.setState({filterdata: newdata, enable: 'asc'});
            }
        }

   }
    reverse(){
        if(this.state.data){
            if(this.state.asc ==='desc'){
                console.log("doing desc");
                let newdata= this.state.infinitedata.sort((a, b) => {
                    console.log("this is ok",a.dramaName, b.dramaName);
                    a.dramaName= a.dramaName.toLowerCase();
                    b.dramaName = b.dramaName.toLowerCase();

                    return (a.dramaName < b.dramaName) ? -1 : (a.dramaName > b.dramaName) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({data: newdata, asc:'asc'});


            }
            else if(this.state.asc === 'asc'){
                console.log("this is asc");
                let newdata= this.state.infinitedata.reverse((a, b) => {
                    console.log("this is ok",a.dramaName, b.dramaName);
                    a.dramaName= a.dramaName.toLowerCase();
                    b.dramaName = b.dramaName.toLowerCase();

                    return (a.dramaName > b.dramaName) ? -1 : (a.dramaName < b.dramaName) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({data: newdata, asc: 'desc'});

            }

        }
        if(this.state.filterdata){
            if(this.state.asc ==='desc'){
                console.log("doing desc");
                let newdata= this.state.filterdata.sort((a, b) => {
                    console.log("this is ok",a.dramaName, b.dramaName);
                    a.dramaName= a.dramaName.toLowerCase();
                    b.dramaName = b.dramaName.toLowerCase();
                    return (a.dramaName < b.dramaName) ? -1 : (a.dramaName > b.dramaName) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({filterdata: newdata, asc:'asc'});
            }
            else if(this.state.asc === 'asc'){
                console.log("this is asc");
                let newdata= this.state.filterdata.reverse((a, b) => {
                    console.log("this is ok",a.dramaName, b.dramaName);
                    a.dramaName= a.dramaName.toLowerCase();
                    b.dramaName = b.dramaName.toLowerCase();
                    return (a.dramaName > b.dramaName) ? -1 : (a.dramaName < b.dramaName) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({filterdata: newdata, asc: 'desc'});
            }
        }

    }

//////////////////////////////////
dramareverse(){
    if(this.state.data){
        if(this.state.asc ==='desc'){
            console.log("doing desc");
            let newdata= this.state.infinitedata.sort((a, b) => {
                console.log("this is ok",a.detail.DramaChannel, b.detail.DramaChannel);
                a.detail.DramaChannel= a.detail.DramaChannel.toLowerCase();
                b.detail.DramaChannel = b.detail.DramaChannel.toLowerCase();

                return (a.detail.DramaChannel < b.detail.DramaChannel) ? -1 : (a.detail.DramaChannel > b.detail.DramaChannel) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({data: newdata, asc:'asc'});


        }
        else if(this.state.asc === 'asc'){
            console.log("this is asc");
            let newdata= this.state.infinitedata.reverse((a, b) => {
                console.log("this is ok",a.detail.DramaChannel, b.detail.DramaChannel);
                a.detail.DramaChannel= a.detail.DramaChannel.toLowerCase();
                b.detail.DramaChannel = b.detail.DramaChannel.toLowerCase();

                return (a.detail.DramaChannel > b.detail.DramaChannel) ? -1 : (a.detail.DramaChannel < b.detail.DramaChannel) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({data: newdata, asc: 'desc'});

        }

    }
    if(this.state.filterdata){
        if(this.state.asc ==='desc'){
            console.log("doing desc");
            let newdata= this.state.filterdata.sort((a, b) => {
                console.log("this is ok",a.dramaName, b.dramaName);
                a.detail.DramaChannel= a.detail.DramaChannel.toLowerCase();
                b.detail.DramaChannel = b.detail.DramaChannel.toLowerCase();
                return (a.detail.DramaChannel < b.detail.DramaChannel) ? -1 : (a.detail.DramaChannel > b.detail.DramaChannel) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({filterdata: newdata, asc:'asc'});
        }
        else if(this.state.asc === 'asc'){
            console.log("this is asc");
            let newdata= this.state.filterdata.reverse((a, b) => {
                console.log("this is ok",a.dramaName, b.dramaName);
                a.detail.DramaChannel= a.detail.DramaChannel.toLowerCase();
                b.detail.DramaChannel = b.detail.DramaChannel.toLowerCase();
                return (a.detail.DramaChannel > b.detail.DramaChannel) ? -1 : (a.detail.DramaChannel < b.detail.DramaChannel) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({filterdata: newdata, asc: 'desc'});
        }
    }

}

/////////////////////////////////////////
plotreverse(){
    if(this.state.data){
        if(this.state.asc ==='desc'){
            console.log("doing desc");
            let newdata= this.state.infinitedata.sort((a, b) => {
                a.detail.Plot= a.detail.Plot.toLowerCase();
                b.detail.Plot = b.detail.Plot.toLowerCase();

                return (a.detail.Plot < b.detail.Plot) ? -1 : (a.detail.Plot > b.detail.Plot) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({data: newdata, asc:'asc'});


        }
        else if(this.state.asc === 'asc'){
            let newdata= this.state.infinitedata.reverse((a, b) => {
                console.log("this is ok",a.detail.Plot, b.detail.Plot);
                a.detail.Plot= a.detail.Plot.toLowerCase();
                b.detail.Plot = b.detail.Plot.toLowerCase();

                return (a.detail.Plot > b.detail.Plot) ? -1 : (a.detail.Plot < b.detail.Plot) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({data: newdata, asc: 'desc'});

        }

    }
    if(this.state.filterdata){
        if(this.state.asc ==='desc'){
            console.log("doing desc");
            let newdata= this.state.filterdata.sort((a, b) => {
                a.detail.Plot= a.detail.Plot.toLowerCase();
                b.detail.Plot = b.detail.Plot.toLowerCase();
                return (a.detail.Plot < b.detail.Plot) ? -1 : (a.detail.Plot > b.detail.Plot) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({filterdata: newdata, asc:'asc'});
        }
        else if(this.state.asc === 'asc'){
            let newdata= this.state.filterdata.reverse((a, b) => {
                a.detail.Plot= a.detail.Plot.toLowerCase();
                b.detail.Plot = b.detail.Plot.toLowerCase();
                return (a.detail.Plot > b.detail.Plot) ? -1 : (a.detail.Plot < b.detail.Plot) ? 1 : 0;
            });
            console.log(newdata);
            this.setState({filterdata: newdata, asc: 'desc'});
        }
    }

}

/////////////////////////////////////////



    delete(){
        console.log(this.state.deleteindex);
        for(let i = 0; i < this.state.infinitedata.length; i++) {
            if(this.state.infinitedata[i].dramaName === this.state.deleteindex) {
                this.state.infinitedata.splice(i, 1);
            }
        }
        this.setState({infinitedata: this.state.infinitedata});
        if(this.state.data){
            this.setState({data: this.state.infinitedata});
        }
        if(this.state.filterdata){
            for(let i = 0; i < this.state.filterdata.length; i++) {
                if(this.state.filterdata[i].dramaName === this.state.deleteindex) {
                    this.state.filterdata.splice(i, 1);
                }
            }
            this.setState({filterdata: this.state.filterdata});
        }
        this.setState({modal:false});
        console.log(this.state.infinitedata);
    }


    filter(value){
        console.log(value);
        let newarray= [];
        if(value !== ''){
            console.log("insideif",value);
            console.log("data.drama")
            let dramas = this.state.infinitedata;
            dramas = dramas.filter(function(drama) {
                return drama.dramaName.toLowerCase().indexOf(value) != -1;
            });
            this.setState({filterdata: dramas, data:null});
        }
        else if(value === '') {
            console.log("inside else",value);
            this.setState({filterdata: null, data: this.state.infinitedata});
        }
    }
    editfield(value){
        console.log(value);

        this.setState({justastate: value});
    }
    edit(indexi,i){
        if(this.state.editindex === i){
            this.setState({editindex: null, editName: null, delete: null, fdelete: null});
        }
        else{
            this.setState({editindex: i, editName: this.state.data[indexi].dramaName, delete: i, fdelete: this.state.data[indexi].dramaName});
        }
    }
    canceledit(){
        this.setState({editindex: null, editName: null, delete: null, fdelete: null});
    }
    editfiltered(value){
        if(this.state.editName === value){
            this.setState({editName: null, editindex: null,fdelete: null, delete:null});
        }
        else {
            this.setState({editName: value, fdelete: value});
            this.state.infinitedata.map((item, index) => {
                if (item.dramaName === value) {
                    this.setState({editindex: value, delete: value});
                }
            });
        }
    }
    render(){
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong> Dummy Data </strong>
                                <button className="btn" type="button" onClick={()=>{this.selectallrows()}}> Select All </button>
                                <Input type="text" onChange={(e)=> this.filter(e.target.value)} className="input-ab" id="name" placeholder="Enter drama name" required />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="widthg1">All Data <i onClick={this.reverse.bind(this)}
                                                                  className={this.state.asc === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                                  'fa fa-chevron-up cursor-pointer'}></i></th>
                                                <th>DataChannel <i onClick={this.dramareverse.bind(this)}
                                                                  className={this.state.asc === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                                  'fa fa-chevron-up cursor-pointer'}></i></th>
                                                <th>Plot <i onClick={this.plotreverse.bind(this)}
                                                                  className={this.state.asc === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                                  'fa fa-chevron-up cursor-pointer'}></i></th>
                                                <th>Enable/disable <i className={this.state.enable === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                    'fa fa-chevron-up cursor-pointer'}
                                                onClick={this.enablesort.bind(this)}></i></th>
                                                <th>edit/delete  </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.data  && this.state.data.map((item, index)=>{
                                                    return(
                                                        <tr key={index} className={item.selected ? "blue":"white"} onClick={()=>{this.selectOneRow(index)}}>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.dramaName ? <Input type="text" defaultValue={item.dramaName} onChange={(e) => this.editfield(e.target.value)}  className=""  id="name" placeholder="Enter drama Channel"   /> : <p className="list-p">{item.dramaName}{index}</p>
                                                                }

                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.dramaName ?
                                                                      <Input type="text" className=" " defaultValue={item.detail.DramaChannel} onChange={(e) => this.editfield(e.target.value)}    id="name" placeholder="Enter drama Channel"  required /> : item.detail.DramaChannel
                                                                }
                                                            </td>
                                                            <td className="widthg">
                                                                {
                                                                    this.state.editindex === item.dramaName ?
                                                                      <Input type="text" className=" " defaultValue={item.detail.Plot} onChange={(e) => this.editfield(e.target.value)}    id="name" placeholder="Enter drama Channel"  required /> : item.detail.Plot
                                                                }
                                                            </td>
                                                            <td>
                                                                <AppSwitch className={'mx-1'} color={'primary'} checked={item.detail.enable} />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary mr-1" onClick={()=> this.edit(index,item.dramaName)}>
                                                                    <i className={ this.state.editindex === item.dramaName ? 'fa fa-check': 'fa fa-edit'}></i>
                                                                </button>
                                                                {
                                                                    this.state.delete !== item.dramaName ?
                                                                        <button
                                                                            onClick={()=> this.toggleDanger(item.dramaName)} className="btn btn-danger" >
                                                                            <i className="fa fa-trash" ></i></button> :
                                                                        <button
                                                                            onClick={()=> this.canceledit()} className="btn btn-danger" >
                                                                            <i className="fa fa-close" ></i></button>
                                                                }
                                                                <Modal isOpen={this.state.modal} toggle={()=> this.toggleDanger()}
                                                                       className={'modal-danger ' + this.props.className}>
                                                                    <ModalHeader toggle={()=> this.toggleDanger()}>Confirm Delete</ModalHeader>
                                                                    <ModalBody>
                                                                        Are You sure you want to delete this drama?
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="danger" onClick={()=>{this.delete()}}>Delete</Button>{' '}
                                                                        <Button color="secondary" onClick={()=> this.toggleDanger()}>Cancel</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.filterdata && this.state.filterdata.map((item, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    this.state.editName === item.dramaName ? <Input type="text" defaultValue={item.dramaName} onChange={(e) => this.editfield(e.target.value)}  className=""  id="name" placeholder="Enter drama Channel"   /> : <p className="list-p">{item.dramaName}{index}</p>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editName === item.dramaName  ?
                                                                        <Input type="text" className=" " defaultValue={item.detail.DramaChannel} onChange={(e) => this.editfield(e.target.value)}    id="name" placeholder="Enter drama Channel"  required /> : item.detail.DramaChannel
                                                                }
                                                            </td>
                                                            <td>
                                                                <AppSwitch className={'mx-1'} color={'primary'} checked={item.detail.enable} />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary mr-1" onClick={()=> this.editfiltered(item.dramaName)}><i className={ this.state.editName === item.dramaName ? 'fa fa-check': 'fa fa-edit'}></i></button>
                                                                {
                                                                    this.state.fdelete !== item.dramaName?
                                                                        <button
                                                                            onClick={()=> this.toggleDanger(item.dramaName)} className="btn btn-danger" >
                                                                            <i className="fa fa-trash" ></i></button> :
                                                                        <button
                                                                            onClick={()=> this.canceledit()} className="btn btn-danger" >
                                                                            <i className="fa fa-close" ></i></button>
                                                                }
                                                                <Modal isOpen={this.state.modal} toggle={()=> this.toggleDanger()}
                                                                       className={'modal-danger ' + this.props.className}>
                                                                    <ModalHeader toggle={()=> this.toggleDanger()}>Confirm Delete</ModalHeader>
                                                                    <ModalBody>
                                                                        Are You sure you want to delete this drama?
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="danger" onClick={()=>{this.delete()}}>Delete</Button>{' '}
                                                                        <Button color="secondary" onClick={()=> this.toggleDanger()}>Cancel</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }

                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </CardBody>
                            <div className="d-flex justify-content-center">
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class={"page-item "+ this.state.disprev } onClick={()=> this.pagenum('prev')}>
                                         <a class="page-link" href="#" tabindex="-1">Previous</a>
                                    </li>
                                    <li onClick={()=> this.pagenumbering(1)} class={"page-item "+this.state.active1}><a class="page-link" href="#">1</a></li>
                                    <li onClick={()=> this.pagenumbering(2)} class={"page-item "+this.state.active2}>
                                        <a class="page-link" href="#">2 </a>
                                    </li>
                                    <li onClick={()=> this.pagenumbering(3)} class={"page-item "+this.state.active3}>
                                            <a class="page-link" href="#">3</a></li>
                                    <li onClick={()=> this.pagenumbering(4)} class={"page-item "+this.state.active4}>
                                            <a class="page-link" href="#">4</a></li>
                                    <li  onClick={()=> this.pagenum('next')} class={"page-item "+ this.state.disnext }>
                                         <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default dramaList;


