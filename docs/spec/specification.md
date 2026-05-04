# Specification

## Summary

The site provides a contact form for business inquiries.

## Functional Requirements

- The inquiry form accepts the customer's name, business email address, affiliation, department, inquiry body, and privacy consent.
- When a valid business email address can be resolved to an affiliation, the form may use that result to fill an empty affiliation field.
- A manually entered affiliation is authoritative. Automated affiliation resolution must not overwrite it.
- If the affiliation currently shown in the form came from automated resolution, changing the email address may replace it with the newly resolved affiliation.

## Acceptance Criteria

- If the affiliation field is empty when an affiliation resolution completes, the resolved affiliation appears in the field.
- If the customer has typed an affiliation before the affiliation resolution completes, the typed value remains unchanged.
- If the affiliation field contains a previous automated result and the customer changes the email address, the next automated result may replace the previous automated result.
