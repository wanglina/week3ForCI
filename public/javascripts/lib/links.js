/*
 * $Id: links.js 75431 2009-05-07 23:34:07Z jvinding $
 * $URL: https://subversion.corp.localmatters.com/subversion/DestinationSearch/ds-core-web/tags/ds-core-web-4.4.91.1/src/main/webapp/js/links.js $
 */

/*jslint browser: true, undef: true, evil: false,
    onevar: true, debug: false, on: false, eqeqeq: true */
/*global LMI, YAHOO*/

/**
 * Apply behaviors to links based on their rel attribute
 * @class LMI.LinkBehavior
 */
LinkBehavior = (function() {
    var types = {};

    /**
     * @method add
     * @param type the value that will be in the links rel attribute
     * @param func the 'click' event handler
     * @param setup a function that's called on page load and is passed the link
     */
    function add( type, func, setup ) {
        if( typeof types[type] !== 'undefined' ) {
            throw( 'attempted to redefine link type "' + type + '"' );
        } else {
            types[type] = [ setup, func ];
        }
    }

    /**
     * @method remove
     * @param type the value that will be in the links rel attribute
     */
    function remove( type ) {
        delete types[type];
    }

    /**
     * Add the appropriate behaviors to the given link element, based on its rel attribute.
     * @param {HTMLElement} link
     * @private
     * Note: uses for loop instead of LMI.Lang.forEach for optimal performance.
     */
    function applyToLink( link ) {
        var t,
            r = String( link.getAttribute( 'rel' ) ).split( ' ' ),
            i = 0, len = r.length;

        for( ; i < len; ++i ) {
            t = types[r[i]];
            if( t ) {
                if( typeof t[0] === 'function' ) {
                    t[0]( link );
                }
                if( typeof t[1] === 'function' ) {
                    YAHOO.util.Event.on( link, 'click', t[1] );
                }
            }
        }
    }

    /**
     * Apply the appropriate registered behaviors to certain link elements.
     * @param {HTMLDocument|HTMLElement} node Behaviors will be added to this node if it is
     *                                   a link element, or to any descendant links otherwise.
     */
    function applyTo( node ) {
        var tag = node.tagName, a, i, iLen;
        if( tag && tag.toUpperCase() === 'A' ) {
            applyToLink( node );
        } else {
            a = node.getElementsByTagName( 'a' );
            iLen = a.length;
            for( i = 0; i < iLen; i++ ) {
                applyToLink( a[i] );
            }
        }
    }

    return {
        add: add,
        remove: remove,
        applyTo: applyTo
    };
})();
