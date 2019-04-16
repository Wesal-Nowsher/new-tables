import React from 'react';
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import data from './movies.json';
import './movies.css';
import { AppSwitch } from '@coreui/react';
import { WithContext as ReactTags } from 'react-tag-input';
import './movies.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


class MovieList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            infintedata: data.movies,
            data: data.movies,
            asc: 'asc',
            enable: 'asc',
            modal: false,
            deleteindex: null,
            filterdata: null,
            editindex: null,
            justastate:null,
            editName: null,
            fdelete: null,
            delete:null,
            tags: [

                { id: "geotv", text: "GEO TV" }
            ],
            suggestions: [
                { id: 'start sports', text: 'Star Sports' },
                { id: 'sama', text: 'SamaTv' },
                { id: 'new ', text: 'NEWTV' },
                { id: 'Costa Ricatv', text: 'Costa Ricatv' },
                { id: 'Sri Lankatv', text: 'Sri Lanka tv' },
                { id: 'Thailandtv', text: 'Thailandtv' }
            ]
        };
    }

    handleDelete(i) {
        console.log("wsal is ok");
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {

        this.state.tags.push(tag);
        this.setState({ tags: this.state.tags });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }


    componentDidMount(){
        console.log(this.state.data);
        let newdata= this.state.infintedata.sort((a, b) => {
            console.log("this is ok",a.movieTitle, b.movieTitle);
            a.movieTitle= a.movieTitle.toLowerCase();
            b.movieTitle = b.movieTitle.toLowerCase();
            return (a.movieTitle < b.movieTitle) ? -1 : (a.movieTitle > b.movieTitle) ? 1 : 0;
        });
        this.setState({data: newdata});

        console.log("this is data",newdata);
    }
    toggleDanger(value) {
        this.setState({modal: !this.state.modal,deleteindex: value});
    }

    enablesort(){
        if(this.state.data){
            if(this.state.enable === 'asc'){
                let newdata= this.state.infintedata.sort(function(a,b){return a.details.enable - b.details.enable});
                console.log("enable sort", newdata);
                this.setState({data: newdata, enable: 'desc'});
            }
            else if(this.state.enable === 'desc'){
                let newdata= this.state.infintedata.reverse(function(a,b){return a.details.enable - b.details.enable});
                console.log("enable sort", newdata);
                this.setState({data: newdata, enable: 'asc'});
            }

        }
        if(this.state.filterdata){
            if(this.state.enable === 'asc'){
                let newdata= this.state.filterdata.sort(function(a,b){return a.details.enable - b.details.enable});
                console.log("enable sort", newdata);
                this.setState({filterdata: newdata, enable: 'desc'});
            }
            else if(this.state.enable === 'desc'){
                let newdata= this.state.filterdata.reverse(function(a,b){return a.details.enable - b.details.enable});
                console.log("enable sort", newdata);
                this.setState({filterdata: newdata, enable: 'asc'});
            }
        }

    }
    delete(){

        for(let i = 0; i < this.state.infintedata.length; i++) {
            if(this.state.infintedata[i].movieTitle === this.state.deleteindex) {
                this.state.infintedata.splice(i, 1);
            }
        }
        this.setState({infintedata: this.state.infintedata});
        if(this.state.data){
            this.setState({data: this.state.infintedata});
        }
        if(this.state.filterdata){
            for(let i = 0; i < this.state.filterdata.length; i++) {
                if(this.state.filterdata[i].movieTitle === this.state.deleteindex) {
                    this.state.filterdata.splice(i, 1);
                }
            }
            this.setState({filterdata: this.state.filterdata});
        }
        this.setState({modal:false});
    }
    reverse(){
        if(this.state.data){
            if(this.state.asc ==='desc'){
                console.log("doing desc");
                let newdata= this.state.infintedata.sort((a, b) => {
                    console.log("this is ok",a.movieTitle, b.movieTitle);
                    a.movieTitle= a.movieTitle.toLowerCase();
                    b.movieTitle = b.movieTitle.toLowerCase();
                    return (a.movieTitle < b.movieTitle) ? -1 : (a.movieTitle > b.movieTitle) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({data: newdata, asc:'asc'});
            }
            else if(this.state.asc === 'asc'){
                console.log("this is asc");
                let newdata= this.state.infintedata.reverse((a, b) => {
                    console.log("this is ok",a.movieTitle, b.movieTitle);
                    a.movieTitle= a.movieTitle.toLowerCase();
                    b.movieTitle = b.movieTitle.toLowerCase();
                    return (a.movieTitle > b.movieTitle) ? -1 : (a.movieTitle < b.movieTitle) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({data: newdata, asc: 'desc'});

            }
        }
        if(this.state.filterdata){
            if(this.state.asc ==='desc'){
                console.log("doing desc");
                let newdata= this.state.filterdata.sort((a, b) => {
                    console.log("this is ok",a.movieTitle, b.movieTitle);
                    a.movieTitle= a.movieTitle.toLowerCase();
                    b.movieTitle = b.movieTitle.toLowerCase();
                    return (a.movieTitle < b.movieTitle) ? -1 : (a.movieTitle > b.movieTitle) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({filterdata: newdata, asc:'asc'});
            }
            else if(this.state.asc === 'asc'){
                console.log("this is asc");
                let newdata= this.state.filterdata.reverse((a, b) => {
                    console.log("this is ok",a.movieTitle, b.movieTitle);
                    a.movieTitle= a.movieTitle.toLowerCase();
                    b.movieTitle = b.movieTitle.toLowerCase();
                    return (a.movieTitle > b.movieTitle) ? -1 : (a.movieTitle < b.movieTitle) ? 1 : 0;
                });
                console.log(newdata);
                this.setState({filterdata: newdata, asc: 'desc'});

            }
        }

    }
    filter(value){
        console.log(value);
        let newarray= [];
        if(value !== ''){
            console.log("insideif",value);
            console.log("data.drama");
            let movies = this.state.infintedata;
            movies = movies.filter(function(movie) {
                return movie.movieTitle.toLowerCase().indexOf(value) != -1;
            });
            this.setState({filterdata: movies, data:null});
        }
        else if(value === '') {
            console.log("inside else",value);
            this.setState({filterdata: null, data: this.state.infintedata});
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
            this.setState({editindex: i, editName: this.state.data[indexi].movieTitle, delete: i, fdelete: this.state.data[indexi].movieTitle});
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
            this.state.infintedata.map((item) => {
                if (item.movieTitle === value) {
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
                                <strong> Movies list </strong>
                                <Input type="text" onChange={(e)=> this.filter(e.target.value)} className="input-ab" id="name" placeholder="Enter drama name" required />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="widthg1">Movies Title <i onClick={this.reverse.bind(this)}
                                                                    className={this.state.asc === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                                        'fa fa-chevron-up cursor-pointer'}></i></th>
                                                <th>Thumbnail </th>
                                                <th className={this.state.editindex ? "widthg": ""}>Tags</th>

                                                <th>Movies URL </th>
                                                <th>Enable/disable <i className={this.state.enable === 'asc' ? 'fa fa-chevron-down cursor-pointer':
                                                    'fa fa-chevron-up cursor-pointer'}
                                                                      onClick={this.enablesort.bind(this)}></i></th>
                                                <th>edit/delete </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                              this.state.data &&  this.state.data.map((item, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.movieTitle  ?
                                                                        <Input type="text" defaultValue={item.movieTitle}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               className=""
                                                                               id="name"
                                                                               placeholder="Enter drama Channel"   /> : <p className="list-p">{item.movieTitle}</p>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.movieTitle ?
                                                                        <Input type="text" className=" "
                                                                               defaultValue={ item.details.MovieART.movieartthumbnail}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               id="name" placeholder="Enter drama Channel"
                                                                               required/> : item.details.MovieART.movieartthumbnail

                                                                }
                                                            </td>
                                                            <td className={this.state.editindex ? "widthg": ""}>
                                                                {
                                                                    this.state.editindex === item.movieTitle ?
                                                                        <ReactTags tags={this.state.tags}
                                                                                   suggestions={this.state.suggestions}
                                                                                   handleDelete={this.handleDelete.bind(this)}
                                                                                   handleAddition={this.handleAddition.bind(this)}
                                                                                   handleDrag={this.handleDrag.bind(this)}
                                                                                   delimiters={delimiters}
                                                                                   classNames={{
                                                                                       tags: 'ReactTags__tags',
                                                                                       tagInput: 'ReactTags__tagInput',
                                                                                       tagInputField: 'ReactTags__tagInputField',
                                                                                       selected: 'ReactTags__selected',
                                                                                       tag: 'ReactTags__tag',
                                                                                       remove: 'ReactTags__remove',
                                                                                       suggestions: 'ReactTags__suggestions',
                                                                                       activeSuggestion: 'ReactTags__activeSuggestion'
                                                                                   }}/>
                                                                        :  this.state.tags.map((item, index)=>{
                                                                        return <p key={index}>{item.text},</p>
                                                                    })
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.movieTitle ?
                                                                        <Input type="text" className=" "
                                                                               defaultValue={ item.details.MovieURL}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               id="name" placeholder="Enter drama Channel"
                                                                               required/> : item.details.MovieURL
                                                                }
                                                            </td>
                                                            <td>
                                                                <AppSwitch className={'mx-1'} color={'primary'} checked={item.details.enable} />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary mr-1" onClick={()=> this.edit(index,item.movieTitle)}>
                                                                    <i className={ this.state.editindex === item.movieTitle ? 'fa fa-check': 'fa fa-edit'}></i>
                                                                </button>
                                                                {
                                                                    this.state.delete !== item.movieTitle ?
                                                                        <button
                                                                            onClick={()=> this.toggleDanger(item.movieTitle)} className="btn btn-danger" >
                                                                            <i className="fa fa-trash" ></i></button> :
                                                                        <button
                                                                            onClick={()=> this.canceledit()} className="btn btn-danger" >
                                                                            <i className="fa fa-close" ></i></button>
                                                                }
                                                                <Modal isOpen={this.state.modal} toggle={()=> this.toggleDanger()}
                                                                       className={'modal-danger ' + this.props.className}>
                                                                    <ModalHeader toggle={()=> this.toggleDanger()}>Confirm Delete</ModalHeader>
                                                                    <ModalBody>
                                                                        Are You sure you want to delete this movie?
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
                                              this.state.filterdata &&  this.state.filterdata.map((item, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    this.state.editName === item.movieTitle?
                                                                        <Input type="text" defaultValue={item.movieTitle}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               className=""
                                                                               id="name"
                                                                               placeholder="Enter drama Channel"   /> : <p className="list-p">{item.movieTitle}</p>
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editindex === item.movieTitle ?
                                                                        <Input type="text" className=" "
                                                                               defaultValue={ item.details.MovieART.movieartthumbnail}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               id="name" placeholder="Enter drama Channel"
                                                                               required/> : item.details.MovieART.movieartthumbnail

                                                                }
                                                            </td>
                                                            <td className={this.state.editindex ? "widthg": ""}>
                                                                {
                                                                    this.state.editindex === item.movieTitle ?
                                                                        <ReactTags tags={this.state.tags}
                                                                                   suggestions={this.state.suggestions}
                                                                                   handleDelete={this.handleDelete.bind(this)}
                                                                                   handleAddition={this.handleAddition.bind(this)}
                                                                                   handleDrag={this.handleDrag.bind(this)}
                                                                                   delimiters={delimiters}
                                                                                   classNames={{
                                                                                       tags: 'ReactTags__tags',
                                                                                       tagInput: 'ReactTags__tagInput',
                                                                                       tagInputField: 'ReactTags__tagInputField',
                                                                                       selected: 'ReactTags__selected',
                                                                                       tag: 'ReactTags__tag',
                                                                                       remove: 'ReactTags__remove',
                                                                                       suggestions: 'ReactTags__suggestions',
                                                                                       activeSuggestion: 'ReactTags__activeSuggestion'
                                                                                   }}/>
                                                                        :  this.state.tags.map((item, index)=>{
                                                                        return <p key={index}>{item.text},</p>
                                                                    })
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    this.state.editName=== item.movieTitle ?
                                                                        <Input type="text" className=" "
                                                                               defaultValue={ item.details.MovieURL}
                                                                               onChange={(e) => this.editfield(e.target.value)}
                                                                               id="name" placeholder="Enter drama Channel"
                                                                               required/> :  item.details.MovieURL
                                                                }
                                                            </td>
                                                            <td>
                                                                <AppSwitch className={'mx-1'} color={'primary'} checked={item.details.enable} />
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary mr-1" onClick={()=> this.editfiltered(item.movieTitle)}>
                                                                    <i className={ this.state.editName === item.movieTitle ? 'fa fa-check': 'fa fa-edit'}></i>
                                                                </button>
                                                                {
                                                                    this.state.fdelete !== item.movieTitle ?
                                                                        <button
                                                                            onClick={()=> this.toggleDanger(item.movieTitle)} className="btn btn-danger" >
                                                                            <i className="fa fa-trash" ></i></button> :
                                                                        <button
                                                                            onClick={()=> this.canceledit()} className="btn btn-danger" >
                                                                            <i className="fa fa-close" ></i></button>
                                                                }
                                                                <Modal isOpen={this.state.modal} toggle={()=> this.toggleDanger()}
                                                                       className={'modal-danger ' + this.props.className}>
                                                                    <ModalHeader toggle={()=> this.toggleDanger()}>Confirm Delete</ModalHeader>
                                                                    <ModalBody>
                                                                        Are You sure you want to delete this movie?
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
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default MovieList;