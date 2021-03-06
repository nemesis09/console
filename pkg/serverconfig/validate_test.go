package serverconfig

import (
	"testing"
)

func TestValidEmptyDeveloperCatalogCategories(t *testing.T) {
	actualCategories, err := validateDeveloperCatalogCategories("")
	if err != nil {
		t.Error("Unexpected error when parsing an empty string.", err)
	}
	if actualCategories != nil {
		t.Errorf("Unexpected value: actual %v, expected %v", actualCategories, nil)
	}
}

func TestValidEmptyArrayForDeveloperCatalogCategories(t *testing.T) {
	actualCategories, err := validateDeveloperCatalogCategories("[]")
	if err != nil {
		t.Error("Unexpected error when parsing an empty array.", err)
	}
	if actualCategories == nil {
		t.Errorf("Unexpected value: actual %v, expected %v", actualCategories, nil)
	}
	if len(actualCategories) != 0 {
		t.Errorf("Unexpected value: actual %v, expected %v", len(actualCategories), 0)
	}
}

func TestValidDeveloperCatalogCategories(t *testing.T) {
	actualCategories, err := validateDeveloperCatalogCategories("[{ \"id\": \"java\", \"label\": \"Java\", \"tags\": [ \"jvm\", \"java\", \"quarkus\" ] }]")
	if err != nil {
		t.Error("Unexpected error when parsing an empty array.", err)
	}
	if actualCategories == nil {
		t.Errorf("Unexpected value: actual %v, expected %v", actualCategories, nil)
	}
	if len(actualCategories) != 1 {
		t.Errorf("Unexpected value: actual %v, expected %v", len(actualCategories), 1)
	}
	if actualCategories[0].ID != "java" {
		t.Errorf("Unexpected value: actual %v, expected %v", actualCategories[0].ID, "java")
	}
	if actualCategories[0].Label != "Java" {
		t.Errorf("Unexpected value: actual %v, expected %v", actualCategories[0].Label, "Java")
	}
	if len(actualCategories[0].Tags) != 3 {
		t.Errorf("Unexpected value: actual %v, expected %v", len(actualCategories[0].Tags), 3)
	}
}

func TestInvalidObjectForDeveloperCatalogCategories(t *testing.T) {
	_, err := validateDeveloperCatalogCategories("{}")
	if err == nil {
		t.Error("Expected an error when parsing an object.")
	}
}

func TestIncompleteDeveloperCatalogCategory(t *testing.T) {
	_, err := validateDeveloperCatalogCategories("[{}]")
	actualMsg := err.Error()
	expectedMsg := "Developer catalog category at index 0 must have at least id and label properties."
	if actualMsg != expectedMsg {
		t.Errorf("Unexpected error: actual\n%s\n, expected\n%s", actualMsg, expectedMsg)
	}
}

func TestIncompleteDeveloperCatalogSubcategory(t *testing.T) {
	_, err := validateDeveloperCatalogCategories("[{ \"id\": \"java\", \"label\": \"Java\", \"tags\": [ \"jvm\", \"java\", \"quarkus\" ], \"subcategories\": [ {} ] }]")
	actualMsg := err.Error()
	expectedMsg := "Developer catalog subcategory at index 0 of category \"java\" must have at least id and label properties."
	if actualMsg != expectedMsg {
		t.Errorf("Unexpected error: actual\n%s\n, expected\n%s", actualMsg, expectedMsg)
	}
}

func TestUnknownPropertyInDeveloperCatalogCategory(t *testing.T) {
	_, err := validateDeveloperCatalogCategories("[{ \"unknown key\": \"ignored value\" }]")
	actualMsg := err.Error()
	expectedMsg := "json: unknown field \"unknown key\""
	if actualMsg != expectedMsg {
		t.Errorf("Unexpected error: actual\n%s\n, expected\n%s", actualMsg, expectedMsg)
	}
}
