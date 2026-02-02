
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllowedUsers } from '../../store/projectSlice';

const UserSelector = ({ projectId, selectedUsers, setSelectedUsers }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.auth.allUsers);
    const currentUser = useSelector(state => state.auth.user);

    const isUserSelected = (username) => {
        return selectedUsers.some(u => u.username === username);
    };

    const getUserPermissions = (username) => {
        return selectedUsers.find(u => u.username === username)?.canManageUsers || false;
    };

    const handleCheckboxChange = (username) => {
        let updatedUsers;

        if (isUserSelected(username)) {
            updatedUsers = selectedUsers.filter(u => u.username !== username);
        } else {
            updatedUsers = [...selectedUsers, { username, canManageUsers: false }];
        }

        if (setSelectedUsers) {
            setSelectedUsers(updatedUsers); // used in CreateProject
        } else {
            dispatch(setAllowedUsers({
                projectId,
                users: updatedUsers,
                currentUser: currentUser.username
            }));
        }
    };

    const handlePermissionToggle = (username) => {
        const updatedUsers = selectedUsers.map(u =>
            u.username === username
                ? { ...u, canManageUsers: !u.canManageUsers }
                : u
        );

        if (setSelectedUsers) {
            setSelectedUsers(updatedUsers);
        } else {
            dispatch(setAllowedUsers({
                projectId,
                users: updatedUsers,
                currentUser: currentUser.username
            }));
        }
    };



    const projects = useSelector(state => state.project.projects);
    const currentProject = projects.find(p => p.id === projectId);
    const projectOwner = currentProject?.owner;



    return (
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <strong>Select users who can access:</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', width: '300px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                {allUsers
                    .filter(user => user !== currentUser.username && user !== projectOwner)
                    .map(user => (
                        <div key={user} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <input style={{ width: '30px', margin: '0px' }}
                                type="checkbox"
                                checked={isUserSelected(user)}
                                onChange={() => handleCheckboxChange(user)}
                            />
                            <span>{user}</span>

                            {isUserSelected(user) && (
                                <label style={{ marginLeft: '10px', fontSize: '14px' }}>
                                    <input style={{ width: '30px', margin: '0px' }}
                                        type="checkbox"
                                        checked={getUserPermissions(user)}
                                        onChange={() => handlePermissionToggle(user)}
                                    />{' '}
                                    Can Manage Users
                                </label>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserSelector;
