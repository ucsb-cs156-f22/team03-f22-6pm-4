import React from 'react';

import MenuItemReviewsTable from "main/components/MenuItemReviews/MenuItemReviewsTable";
import { menuitemreviewsFixtures } from 'fixtures/menuitemreviewsFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemReviewsTable',
    component: MenuItemReviewsTable
};

const Template = (args) => {
    return (
        <MenuItemReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuitemreviews: []
};

export const ThreeMenuItemReviews = Template.bind({});

ThreeMenuItemReviews.args = {
    menuitemreviews: menuitemreviewsFixtures.threeMenuItemReviews
};