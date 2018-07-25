# Contacts-Api
 
 If you haven't already, <a href="https://github.com/jtdarkly/Contacts-Node-API/blob/master/README.md">read this first</a>.
 
 ## What Is It?
 Contacts-api is a simple storage app for contact information.  Currently, it only stores names and physical addresses.  One contact can have multiple names and addresses, because people move and/or change their names sometimes.
 
 ## API Definition
<table>
    <tr>
        <th>Method</th>
        <th>URI</th>
        <th>Media type</th>
        <th>Description</th>
        <th>Status Code</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/</td>
        <td>text/plain</td>
        <td>Returns string with API host and port.</td>
        <td>200 OK,<br />500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/</td>
        <td>text/plain</td>
        <td>Returns string with API host and port.</td>
        <td>200 OK,<br />500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns all the contacts, and their associated names and addresses.</td>
        <td>200 OK,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1.0/contacts</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Creates a new contact; if name(s) and/or address(es) are includes, will create associated names and addresses.  When a contact is created, a Location header is returned.  It provides the URL where the newly created contact can be accessed.</td>
        <td>201 Created,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns a single contact for the selected entryId, and the associated names and addresses.  If there is no such contact, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> <br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}/primary</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns a single contact for the selected entryId, and the primary associated name and address.  If there is no such contact, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1.0/contacts/{entryId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Deletes an existing contact; if an contact with the provided identifier does not exist, it returns 404.</td>
        <td>204 No Content,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
        </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1.0/contacts/{entryId}/names</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Creates a new name in the selected contact. When a name is created, a Location header is returned.  It provides the URL where the newly created name can be accessed.</td>
        <td>201 Created,<br /> 400 BAD REQUEST,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}/names</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns all the names for the selected entryId. If there is no such contact, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}/names/{nameId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns a single name for the selected nameId, associated with the entryId.  If there is no such name, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/v1.0/contacts/{entryId}/names/{nameId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Updates an existing name; if a name for the provided identifier does not exist, it returns 404.</td>
        <td>200 OK,<br /> 400 BAD REQUEST,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1.0/contacts/{entryId}/names/{nameId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Deletes a existing name; if a name with the provided identifier does not exist, it returns 404.</td>
        <td>204 No Content,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/v1.0/contacts/{entryId}/addresses</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Creates a new address in the selected contact. When an address is created, a Location header is returned.  It provides the URL where the newly created address can be accessed.</td>
        <td>201 Created,<br /> 400 BAD REQUEST,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}/addresses</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns all the addresses for the selected entryId. If there is no such contact, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/v1.0/contacts/{entryId}/addresses/{addressId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Returns a single address for the selected addressId, associated with the entryId.  If there is no such address, it returns 404.</td>
        <td>200 OK,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/v1.0/contacts/{entryId}/addresses/{addressId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Updates an existing address; if an address for the provided identifier does not exist, it returns 404.</td>
        <td>200 OK,<br /> 400 BAD REQUEST,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/v1.0/contacts/{entryId}/addresses/{addressId}</td>
        <td>text/plain,<br />application/json,<br />text/xml</td>
        <td>Deletes a existing address; if an address with the provided identifier does not exist, it returns 404.</td>
        <td>204 No Content,<br />404 NOT FOUND,<br /> 500 Internal Server Error</td>
    </tr>
</table>
