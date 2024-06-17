import React from 'react';
import { Link } from 'react-router-dom';

const links = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
    { href: '/EntryForm', text: 'EntryForm' },
    { href: '/EntryList', text: 'EntryList' },
    { href: '/ExitForm', text: 'ExitForm' },
    { href: '/ExitList', text: 'ExitList' }
]
const navbar = () => {
    return <div>
        {links.map(x => (
            <Link to={x.href}>{x.text}</Link>
        ))}
    </div>
};
export default navbar;