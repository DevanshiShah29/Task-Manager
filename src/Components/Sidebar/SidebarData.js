import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'Calendar',
      path: '/calendar',
      icon: <AiIcons.AiFillCalendar />,
      cName: 'nav-text'
    },
    // {
    //   title: 'Team',
    //   path: '/team',
    //   icon: <IoIcons.IoMdPeople />,
    //   cName: 'nav-text'
    // },
    {
      title: 'About',
      path: '/about',
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: 'nav-text'
    },
    {
      title: 'Support',
      path: '/support',
      icon: <IoIcons.IoMdHelpCircle />,
      cName: 'nav-text'
    }
  ];
