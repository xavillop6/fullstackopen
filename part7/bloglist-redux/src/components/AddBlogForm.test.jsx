import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlogForm from "./AddBlogForm";

const initialBlog = {
  id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  user: {
    id: "5a437a851b54a676234d17f7",
    username: "mluukkai",
    name: "Matti Luukkainen",
  },
};

test("<AddBlogForm /> calls event handler with correct arguments", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<AddBlogForm createBlog={createBlog} />);

  const authorInput = component.container.querySelector("#author");
  const titleInput = component.container.querySelector("#title");
  const urlInput = component.container.querySelector("#url");
  const sendButton = component.container.querySelector("#create");

  await user.type(authorInput, initialBlog.author);
  await user.type(urlInput, initialBlog.url);
  await user.type(titleInput, initialBlog.title);
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(initialBlog.title);
  expect(createBlog.mock.calls[0][0].author).toBe(initialBlog.author);
  expect(createBlog.mock.calls[0][0].url).toBe(initialBlog.url);
});
