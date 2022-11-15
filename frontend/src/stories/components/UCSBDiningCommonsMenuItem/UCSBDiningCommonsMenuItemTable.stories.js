import React from 'react';

import UCSBDiningCommonsMenuItemTable from 'main/components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemTable';
import { ucsbDiningCommonsMenuItemFixtures } from 'fixtures/ucsbDiningCommonsMenuItemFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemTable',
    component: UCSBDiningCommonsMenuItemTable
};

const Template = (args) => {
    return (
        <UCSBDiningCommonsMenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ucsbDiningCommonsMenuItem: []
};

export const threeDiningCommonsMenuItem = Template.bind({});

threeDiningCommonsMenuItem.args = {
    ucsbDiningCommonsMenuItem: ucsbDiningCommonsMenuItemFixtures.threeDiningCommonsMenuItem,
    currentUser: currentUserFixtures.adminUser
};

