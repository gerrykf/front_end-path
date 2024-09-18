import MyButton from "./components/MyButton.js";

const template = `
    <div id="app">
        <h1>APP组件</h1>
        <MyButton/>
    </div>
`;

export default {
  components: {
    MyButton,
  },
  template,
};
