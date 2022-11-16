import { fireEvent, render, waitFor } from "@testing-library/react";
import ArticlesTable from "main/components/Articles/ArticlesTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { articlesFixtures } from "fixtures/articlesFixtures";
import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";

import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";



const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ArticlesTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );


    const expectedHeaders = ['id',  'title', 'url','explanation','email','dateAdded'];
    const expectedFields = ['id',  'title', 'url','explanation','email','dateAdded'];
    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach(() => {
      const header = getByTestId(`ArticlesTable-header-url`);
      expect(header).toBeInTheDocument();
      const header2 = getByTestId(`ArticlesTable-header-id`);
      expect(header2).toBeInTheDocument();
      const header3 = getByTestId(`ArticlesTable-header-email`);
      expect(header3).toBeInTheDocument();
      const header4 = getByTestId(`ArticlesTable-header-dateAdded`);
      expect(header4).toBeInTheDocument();
    });

//    expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra");
//    expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
//    expect(getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("De La Guerra");
//    expect(getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("Ortega");

    const deleteButton = getByTestId(`ArticlesTable-header-Delete`);
    expect(deleteButton).toBeInTheDocument();
  });


      test("test what happens when you click delete, admin", async () => {
          const axiosMock =new AxiosMockAdapter(axios);
          const queryClient = new QueryClient();
          axiosMock.onGet("/api/articles/all").reply(200, articlesFixtures.threeArticles);
          axiosMock.onDelete("/api/articles", {params: {code: "2"}}).reply(200, "Articles with id 2 was deleted");

        const currentUser = currentUserFixtures.adminUser;

          const { getByTestId } = render(
              <QueryClientProvider client={queryClient}>
                  <MemoryRouter>
                      <ArticlesTable articles={articlesFixtures.threeArticles} currentUser={currentUser} />
                  </MemoryRouter>
              </QueryClientProvider>
          );

//          await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-code`)).toBeInTheDocument(); });



         expect(getByTestId(`ArticlesTable-cell-row-1-col-url`)).toHaveTextContent("www.samsung.com/pad");


          const deleteButton = getByTestId(`ArticlesTable-cell-row-1-col-Delete-button`);
          expect(deleteButton).toBeInTheDocument();

          fireEvent.click(deleteButton);

//          await waitFor(() => { expect(mockToast).toBeCalledWith("Articles with id 2 was deleted") });

      });


});

