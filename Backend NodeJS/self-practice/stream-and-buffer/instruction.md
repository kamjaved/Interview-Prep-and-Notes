Let's create a scenario where we read a text file, make a simple "transformation" on its content (which will involve working with buffers), and then write the transformed content to a new file. This demonstrates both concepts clearly and is a very common pattern.

### Real-World Example: Log File Anonymizer (Simple)

**Scenario:**
Imagine you have a large log file that contains sensitive information (e.g., specific IP addresses or user IDs). Before sharing this log file, you want to "anonymize" it by replacing certain patterns with generic placeholders. Doing this on a large file efficiently requires streams.

**Goal:**
Read a log file, replace all occurrences of the word "secret" with "ANONYMIZED", and write the modified content to a new file. We'll use a `Transform` stream to perform the replacement, highlighting both stream processing and buffer manipulation within that stream.

**File Structure:**

```
project-root/
├── log-anonymizer.js  (Our main script)
├── input.log          (The original log file)
└── output/            (Directory for the processed file)
```

**Step 1: Create the `input.log` file**

Create a file named `input.log` in your project root with the following content:

```
[2024-05-15 10:00:01] INFO: User 123 logged in from 192.168.1.100.
[2024-05-15 10:00:05] WARN: Failed attempt to access secret resource.
[2024-05-15 10:00:10] INFO: Data transfer successful to secret destination.
[2024-05-15 10:00:15] DEBUG: Processing user secret profile.
[2024-05-15 10:00:20] ERROR: Critical failure near secret database.
[2024-05-15 10:00:25] INFO: Another line without secret.
```

**Step 2: Create the `output/` directory**

Create an empty directory named `output` in your project root.

**Step 3: Write the `log-anonymizer.js` code**
