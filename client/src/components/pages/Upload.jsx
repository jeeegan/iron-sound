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
      upload_img: "",
      upload_type: "track",
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      title: this.state.title,
      artist: this.state.artist,
      album: this.state.album,
      year: this.state.year,
      genre: this.state.genre,
      tags: this.state.tags,
      embed_url: this.state.embed_url,
      host: this.state.host,
      upload_img: this.state.upload_img,
      upload_type: this.state.upload_type,
      message: null
    }
    api.upload(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return(
      <div>
        <Container>
          <Row>
          <Col xs="6">
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
                <Input type="text" value={this.state.upload_img} onChange={(e) => this.handleInputChange("upload_img", e)} />
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