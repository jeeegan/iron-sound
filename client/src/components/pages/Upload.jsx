import React, { Component } from 'react';
import api from '../../api';
import { Form, FormGroup, Container, Label, Input, Button, Col, Row } from 'reactstrap';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      album: "",
      year: 1990,
      genre: "",
      tags: [],
      embed_url: "",
      host: 'bc',
      upload_img: null,
      upload_type: "track",
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleFileUpload = e => {
    this.setState({
      upload_img: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("artist", this.state.artist);
    formData.append("album", this.state.album);
    formData.append("year", this.state.year);
    formData.append("genre", this.state.genre);
    formData.append("tags", this.state.tags);
    formData.append("embed_url", this.state.embed_url);
    formData.append("host", this.state.host);
    formData.append("upload_img", this.state.upload_img);
    formData.append("upload_type", this.state.upload_type);
    api.upload(formData)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  render() {
    return(
      <div className="pageContent">
        <Container>
          <Row>
          <Col xs="10">
            <Form>
              <FormGroup>
                <Label>Title </Label>
                <Input type="text" value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Artist </Label>
                <Input type="text" value={this.state.artist} onChange={(e) => this.handleInputChange("artist", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Album </Label>
                <Input type="text" value={this.state.album} onChange={(e) => this.handleInputChange("album", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Year </Label>
                <Input type="number" value={this.state.year} onChange={(e) => this.handleInputChange("year", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Genre </Label>
                <Input type="text" value={this.state.genre} onChange={(e) => this.handleInputChange("genre", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Track URL </Label>
                <Input type="text" value={this.state.embed_url} onChange={(e) => this.handleInputChange("embed_url", e)} />
              </FormGroup>
              <FormGroup>
                <Label>Host </Label>
                <select type="select" value={this.state.host} onChange={(e) => this.handleInputChange("host", e)}>
                  <option value="bc">Bandcamp</option>
                  <option value="sc">Soundcloud</option>
                  <option value="yt">Youtube</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label>Image </Label>
                <Input type="file" onChange={(e) => this.handleFileUpload(e)} />
              </FormGroup>
              <FormGroup>
                <Label>Upload Type </Label>
                <select type="select" value={this.state.upload_type} onChange={(e) => this.handleInputChange("upload_type", e)}>
                  <option value="track">Track</option>
                  <option value="album">Album</option>
                </select>
              </FormGroup>
              <Button onClick={(e) => this.handleClick(e)}>Upload</Button>
            </Form>
          </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Upload;