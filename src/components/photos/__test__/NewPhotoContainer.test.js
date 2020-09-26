import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewPhotoContainer from "../NewPhotoContainer.js";
import NewPhotoForm from "../NewPhotoForm.js";
import Loader from "../../../layout/Loader.js";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe("Test API fetch", () => {
  test("Data resolved from API should be truthy", async () => {
    const wrapper = shallow(<NewPhotoContainer />);
    const instance = wrapper.instance();
    const input = {
      title: "Photo",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    };
    const response = await instance.createPhoto(input);
    expect(response).toBeTruthy();
  });

  test("Data resolved from API should answer an specific object", async () => {
    const wrapper = shallow(<NewPhotoContainer />);
    const instance = wrapper.instance();
    const input = {
      title: "Photo",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    };
    const response = await instance.createPhoto(input);
    expect(response).toEqual(input);
  });
});

describe("Test state and props in method", () => {
  test("Initial 'loading' state should be false", () => {
    const wrapper = shallow(<NewPhotoContainer />);
    expect(wrapper.state("loading")).toBe(false);
  });

  test("'Sent' state should be true when createPhoto method is called", async () => {
    const wrapper = shallow(<NewPhotoContainer />);
    const eventSimulated = { preventDefault: () => {} };
    const instance = wrapper.instance();
    const input = {
      title: "Photo",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    };
    wrapper.setState({ form: input });
    expect(wrapper.state("sent")).toBe(false);
    await instance.createPhoto(input);
    expect(wrapper.state("sent")).toBe(true);
  });

  test("There should be an error when input is not valid when createPhoto method is called", async () => {
    const wrapper = shallow(<NewPhotoContainer />);
    const eventSimulated = { preventDefault: () => {} };
    const instance = wrapper.instance();
    const input = {
      title: 15159,
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      thumbnailUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    };
    wrapper.setState({ form: input });
    expect(wrapper.state("sent")).toBeFalsy;
    await instance.createPhoto(input);
    expect(wrapper.state("error")).toBeTruthy;
  });
});

describe("Container contains key components", () => {
  it("Contains a loader component when is loading", () => {
    const wrapper = shallow(<NewPhotoContainer />);
    wrapper.setState({ loading: true });
    expect(wrapper).toContainReact(<Loader />);
  });
});

describe("Snapshot of component", () => {
  it("Matches snapshot in default state", () => {
    const tree = renderer.create(<NewPhotoContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
