import React from 'react';

import ArticlesTable from "main/components/Articles/ArticlesTable";
import { articlesFixtures } from 'fixtures/articleFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Articles/ArticlesTable',
    component: ArticlesTable
};

const Template = (args) => {
    return (
        <ArticlesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    articles: []
};

export const threeArticles = Template.bind({});

ThreeArticles.args = {
    articles: articlesFixtures.threeArticles
};

export const ArticlesAsAdmin = Template.bind({});

ArticlesAsAdmin.args = {
    articles: articlesFixtures.threeCommons,
    currentUser: currentUserFixtures.adminUser
};

