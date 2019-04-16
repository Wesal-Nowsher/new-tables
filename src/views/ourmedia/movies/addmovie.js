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
import { WithContext as ReactTags } from 'react-tag-input';
import './movies.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class addMovie extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tags: [


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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }
    render(){
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Add Movie </strong>

                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Movie Title</Label>
                                            <Input type="text" id="name" placeholder="Enter movie title" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor=""> Movie Url</Label>
                                            <Input type="text" id="" placeholder="Enter Url" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor=""> Starring</Label>
                                            <Input type="text" id="" placeholder="Starring" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="">Tags</Label>
                                            <div>
                                            <ReactTags tags={this.state.tags}
                                                       suggestions={this.state.suggestions}
                                                       handleDelete={this.handleDelete}
                                                       handleAddition={this.handleAddition}
                                                       handleDrag={this.handleDrag}
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
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="2">
                                        <FormGroup>
                                            <Input  id="" type="button" className="btn btn-primary mt-3" value="Submit" />
                                        </FormGroup>
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
export default addMovie;