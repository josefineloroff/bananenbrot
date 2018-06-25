import React, { PureComponent } from 'react'
import MyNavbar from '../Navbar/MyNavbar'
import { saveFullState } from '../../service'
import { Button, Form, Label, Input } from 'reactstrap'
import { axios } from 'axios'

import './Inputformular.css'

export default class Inputformular extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      category: '',
      name: '',
      imageUrl: '',
      descriptionText: '',
      key: 'id',
      file: null,
    }
  }

  onChange = event => {
    console.log(event.target.value)
    const input = event.target
    const file = input.files && input.files.length && event.target.files[0]
    this.setState({
      [input.name]: input.value,
      file: file,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState(
      {
        ...this.state,
      },
      () => {
        saveFullState(this.state)
        fetch('/product', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            category: this.state.category,
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            file: this.state.file,
            descriptionText: this.state.descriptionText,
            showBookmarkIcon: true,
            showLikeIcon: true,
            showTrashIcon: true,
            likes: 0,
            trashes: 0,
            isLiked: 0,
            isBookmarked: 0,
            isTrashed: 0,
            key: this.state.name,
          }),
        })
      }
    )
  }

  render() {
    return (
      <div>
        <MyNavbar />
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <Label>
              <p>Choose your category:</p>{' '}
              <Input
                type="select"
                name="category"
                value={this.state.category}
                onChange={this.onChange}
              >
                {['Nerds', 'Geeks', 'Retros'].map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Input>
            </Label>{' '}
            <br />
            <br />
            <p>Add the name of your product</p>
            <Input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.onChange}
            />
            <br />
            <p>Add a description text for your product</p>
            <Input
              type="text"
              value={this.state.descriptionText}
              name="descriptionText"
              onChange={this.onChange}
            />
            <br />
            <p>Image Upload</p>
            <Input
              // onChange={this.handleUploadFileonChange}
              type="file"
              value={this.state.imageUrl}
              name="imageUrl"
              onChange={this.onChange}
              // type="submit"
              // value="Submit"

              className="file-upload"
              data-cloudinary-field="image_id"
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
            <button
              className="button"
              type="submit"
              onClick={this.handleUploadFile}
            >
              Upload
            </button>
            <Button type="submit" onClick={this.handleUploadFile}>
              Submit
            </Button>
          </Form>

          <br />
        </div>
      </div>
    )
  }
}
