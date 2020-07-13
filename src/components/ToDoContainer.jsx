import React, { Component } from "react";
import axios from "axios";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const token = localStorage.getItem("user");

export default class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemList: [],
    };
  }

  componentWillMount() {
    axios.get(`http://localhost:5000/user/list/${token}`).then((res) => {
      const data = res.data;
      if (data.authentication) this.props.authenticate("null");
      else if (data.list) this.setState({ itemList: [...data.list] });
      else alert(data);
    });
  }

  updateItemList = (res) => {
    const data = res.data;
    if (data.authentication) this.props.authenticate("null");
    else if (data.list) window.location.reload();
    else alert(data);
  };

  addItem = () => {
    if (this.state.itemName.trim() === "") {
      alert("Enter a new item name");
      return;
    }
    axios
      .post(`http://localhost:5000/user/add-item/${token}`, {
        item: this.state.itemName,
      })
      .then((res) => this.updateItemList(res));
  };

  onItemPress = (id) => {
    if (!document.getElementById(id).hasAttribute("readonly")) return;
    axios
      .post(`http://localhost:5000/user/item-status/${token}`, {
        id,
      })
      .then((res) => this.updateItemList(res));
  };

  deleteItem = (id) => {
    axios
      .post(`http://localhost:5000/user/delete-item/${token}`, {
        id,
      })
      .then((res) => this.updateItemList(res));
  };

  editItem = (id, name) => {
    axios
      .post(`http://localhost:5000/user/edit-item/${token}`, {
        id,
        name,
      })
      .then((res) => this.updateItemList(res));
  };

  render() {
    return (
      <div id="to-do-list" className="col-11 col-sm-7 py-2 px-3">
        <div id="add-item">
          <input
            value={this.state.itemName}
            className="py-3"
            placeholder="New Item"
            type="text"
            onChange={(e) => this.setState({ itemName: e.target.value })}
          />
          <span onClick={this.addItem} title="Add" className="m-0 float-button">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <ToDoList
          editItem={this.editItem}
          onItemPress={this.onItemPress}
          deleteItem={this.deleteItem}
          itemList={this.state.itemList}
        />
      </div>
    );
  }
}
