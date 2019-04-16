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


class addDrama extends React.Component{
    render(){
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Add Drama </strong>

                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="name">Drama Name</Label>
                                            <Input type="text" id="name" placeholder="Enter drama name" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor=""> Drama Channel</Label>
                                            <Input type="text" id="" placeholder="Enter drama channel" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                 <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor=""> Episode URL </Label>
                                            <Input type="text" id="" placeholder="Enter url" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                 <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="">Plot</Label>
                                            <Input  id="" placeholder="Enter Plot" required />
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
export default addDrama;