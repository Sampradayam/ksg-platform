
async function runTests() {
    console.log("Running Enrollment API Tests...");

    const baseUrl = 'http://localhost:3000/api/enrollments';
    const testUser = 'user_test_001';
    const testBatch = 'batch_2025_A';

    // Helper for requests
    const postEnrollment = async (data) => {
        try {
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const body = await res.json();
            return { status: res.status, body };
        } catch (e) {
            return { error: e.message };
        }
    };

    // Test 1: Successful Validation Error
    console.log("\n[Test 1] Missing fields validation...");
    const valRes = await postEnrollment({ user_id: testUser });
    if (valRes.status === 400) {
        console.log("PASS: Got 400 Bad Request as expected.");
    } else {
        console.error("FAIL: Expected 400, got", valRes.status);
    }

    // Test 2: Successful Creation
    console.log("\n[Test 2] Creating new valid enrollment...");
    // Using simple random suffix to ensure test repeatability if DB isn't wiped
    const uniqueUser = testUser + '_' + Date.now();
    const createRes = await postEnrollment({ user_id: uniqueUser, batch_id: testBatch });
    if (createRes.status === 201 && createRes.body.status === 'pending') {
        console.log("PASS: Created 201 with status 'pending'.");
    } else {
        console.error("FAIL: Expected 201 'pending', got", createRes.status, createRes.body);
    }

    // Test 3: Duplicate Prevention
    console.log("\n[Test 3] Attempting duplicate enrollment...");
    const dupRes = await postEnrollment({ user_id: uniqueUser, batch_id: testBatch });
    if (dupRes.status === 409) {
        console.log("PASS: Got 409 Conflict as expected.");
    } else {
        console.error("FAIL: Expected 409, got", dupRes.status, dupRes.body);
    }

    console.log("\nTests Complete.");
}

runTests();
