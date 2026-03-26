import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const TEST_CASES_FILE = join(process.cwd(), 'app', 'data', 'test_cases.json');

export async function GET() {
  try {
    const data = await readFile(TEST_CASES_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read test cases' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testCaseName, productTeam } = body;

    if (!testCaseName || !productTeam) {
      return NextResponse.json(
        { error: 'Test case name and product team are required' },
        { status: 400 }
      );
    }

    const existingData = await readFile(TEST_CASES_FILE, 'utf-8');
    const testCases = JSON.parse(existingData);

    const newTestCase = {
      'Test Case Name ': testCaseName,
      'Product Teams': productTeam,
    };

    testCases.push(newTestCase);

    await writeFile(TEST_CASES_FILE, JSON.stringify(testCases, null, 2));

    return NextResponse.json(
      { success: true, data: newTestCase },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save test case' },
      { status: 500 }
    );
  }
}
