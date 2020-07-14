import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
import ToDoList from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemList: [],
    };
  }

  componentDidMount() {
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    const token = localStorage.getItem("user");
    axios
      .get(`https://powerful-temple-81597.herokuapp.com/user/list/${token}`)
      .then((res) => {
        loading.classList.add("d-none");
        const data = res.data;
        if (data.authentication) this.props.authenticate("null");
        else if (data.list) this.setState({ itemList: [...data.list] });
        else alert(data);
      });
  }

  updateItemList = (res, loading) => {
    loading.classList.add("d-none");
    const data = res.data;
    if (data.authentication) this.props.authenticate("null");
    else if (data.list)
      this.setState({ itemName: "", itemList: [...data.list] });
    else alert(data);
  };

  addItem = () => {
    const token = localStorage.getItem("user");
    if (this.state.itemName.trim() === "") {
      alert("Enter a new item name");
      return;
    }
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    axios
      .post(
        `https://powerful-temple-81597.herokuapp.com/user/add-item/${token}`,
        {
          item: this.state.itemName,
        }
      )
      .then((res) => this.updateItemList(res, loading));
  };

  onItemPress = (id) => {
    const token = localStorage.getItem("user");
    if (!document.getElementById(id).hasAttribute("readonly")) return;
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    axios
      .post(
        `https://powerful-temple-81597.herokuapp.com/user/item-status/${token}`,
        {
          id,
        }
      )
      .then((res) => this.updateItemList(res, loading));
  };

  deleteItem = (id) => {
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    const token = localStorage.getItem("user");
    axios
      .post(
        `https://powerful-temple-81597.herokuapp.com/user/delete-item/${token}`,
        {
          id,
        }
      )
      .then((res) => this.updateItemList(res, loading));
  };

  editItemStart = (id) => {
    document.getElementById(id).removeAttribute("readonly");
    document.getElementById(id).classList.add("input-edit");
    document.getElementById(id).focus();
    document.getElementById(`edit${id}`).classList.remove("d-none");
  };

  editItemUpdateValue = (id, name) => {
    const newList = [...this.state.itemList];
    newList.map((item) => {
      if (item._id === id) item.item = name;
      return item;
    });
    this.setState({ itemList: [...newList] });
  };

  editItem = (id) => {
    const name = this.state.itemList.filter((item) => item._id === id)[0].item;
    document.getElementById(id).setAttribute("readonly", "readonly");
    document.getElementById(id).classList.remove("input-edit");
    document.getElementById(`edit${id}`).classList.add("d-none");
    const loading = document.getElementById("loading-container");
    loading.classList.remove("d-none");
    const token = localStorage.getItem("user");
    axios
      .post(
        `https://powerful-temple-81597.herokuapp.com/user/edit-item/${token}`,
        {
          id,
          name,
        }
      )
      .then((res) => this.updateItemList(res, loading));
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
          editItemStart={this.editItemStart}
          editItemUpdateValue={this.editItemUpdateValue}
          editItem={this.editItem}
          onItemPress={this.onItemPress}
          deleteItem={this.deleteItem}
          itemList={this.state.itemList}
        />
      </div>
    );
  }
}
