1. How to Run the Solution

- This Node.js + Express.js backend application is designed to simulate a simplified internal system for managing students, roles, reviews, and major-role-user relationships. To run it locally:

    a. Clone Repository
        git clone https://github.com/sandbox-recruiting/f2025-chrysalis-challenge-ronaldnguyen7.git
        cd f2025-chrysalis-challenge-ronaldnguyen7

    b. Checkout the working branch
        git checkout ood-approach

    c. Install dependencies
        npm install

    d. Start the server
        node app.js

    e. Run tests
        npm test

2. Thought Process and Design Philosophy
My primary goal in approaching this challenge was to build a clean, maintainable backend structure that mirrored real-world backend architecture—prioritizing clarity, data integrity, and extensibility.

To achieve this, I designed the system around:

- Class-Based Models: Each entity (e.g., User, Role, Review) is encapsulated as a class with clearly defined fields and accessors. This approach provided consistency across data representations and enabled easy serialization via .toJson() methods.
- Separation of Concerns: Business logic is abstracted into model classes (UserModel, ReviewModel, etc.), while routing logic is isolated in controller files. This made it easier to test, modify, and scale each part of the system independently.
- 3rd Normal Form (3NF) Principles: All in-memory data structures simulate how data would be structured in a normalized SQL schema:
    - Users are separate from Majors and are linked via a UserMajor relationship.
    - Roles are decoupled from Majors via the RoleMajor table.
    - Reviews maintain atomic fields and are related to Users and Roles by foreign keys (userId, roleId).

This normalized approach ensures:
- No redundant data across the system.
- Easy lookups and filtering based on relationships.
- Flexibility to expand into a relational database with minimal changes.

Overall, I aimed to write code that mirrors real-world backend development patterns, while still remaining lean and readable for the scope of the challenge.

3. Technical Problems
One of the biggest challenges I faced during implementation was the iterative nature of designing clean solutions. I often found myself coming up with a working approach—only to realize shortly after writing it that it could be made simpler, more modular, or more scalable. This happened frequently with the relationship models (e.g., RoleMajorModel, UserMajorModel) where filtering logic and ID lookups initially started out nested and verbose, and were later refined into efficient set-based filters.

Another major hurdle was adjusting to JavaScript as a typeless language. Coming from a strong Java background, I’m used to having strict type enforcement and compile-time checks. In JavaScript:

- Type coercion and the lack of compile-time type safety led to subtle bugs—especially when dealing with inputs that might be strings, numbers, or arrays.
- I had to manually enforce types through helper utilities (typecheckUtility.js) to mimic Java-like safety and avoid logic errors.
- It was particularly tricky when parsing and validating query parameters, as they’re always received as strings even when semantically numeric.

These hurdles made the project more educational, and helped me better appreciate the flexibility of JavaScript while also learning how to enforce structure in an otherwise loosely typed environment.

4. Approximate Time to complete the project
I spent approximately 6 hours per day over the course of 7 days, totaling around 42 hours.

This time included:

- Planning the architecture and relationships
- Designing and implementing the class-based model structure
- Building controller logic with validation
- Debugging edge cases and refining logic
- Writing utilities for type enforcement
- Testing endpoints and refactoring for clarity

The challenge was both time-intensive and rewarding, giving me the chance to deeply explore architectural design and backend consistency in a full-stack simulation.

5. General Feedback
Overall, this was a well-structured and meaningful challenge that allowed me to demonstrate backend design, data modeling, and API development skills in a hands-on way. I appreciated the open-ended nature of the task—it gave me the freedom to make architectural decisions and apply real-world engineering practices like normalization, modularization, and layered abstraction.

What I appreciated:
- The prompt was clear and encouraged thoughtful system design, not just coding.
- It was satisfying to simulate database relationships like many-to-many (UserMajor, RoleMajor) and validate that logic in memory.
- The challenge scope felt realistic and practical for an internal system like Cooper.

Suggestions:
- Clearer '/GET' directions. The prompt gave almost no guidance on what the /GET endpoints should return for each data type outside of part 2. Clearer expectations (e.g. return shape, filtering behavior, default behavior with no query) would make implementation more aligned and efficient across candidates.