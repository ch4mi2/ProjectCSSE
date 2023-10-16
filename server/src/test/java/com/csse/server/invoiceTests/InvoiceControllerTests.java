package com.csse.server.invoiceTests;

import com.csse.server.controller.InvoiceController;
import com.csse.server.model.Invoice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class InvoiceControllerTests {

    @Autowired
    private InvoiceController invoiceController;

    @Test
    public void testGetAllInvoices() {
        ResponseEntity<List<Invoice>> response = invoiceController.getAllInvoices();

        // Positive assertion - Check that the HTTP status code is OK (200)
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Positive assertion - Check that the response contains a non-empty list of invoices
        List<Invoice> invoices = response.getBody();
        assertNotNull(invoices);
        assertTrue(!invoices.isEmpty());
    }

    @Test
    public void testCreateInvoice() {
        Invoice newInvoice = createSampleInvoice(); // Create a sample invoice for testing

        ResponseEntity<Invoice> response = invoiceController.createInvoice(newInvoice);

        // Positive assertion - Check that the HTTP status code is CREATED (201)
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Positive assertion - Check that the returned invoice matches the one sent
        Invoice createdInvoice = response.getBody();
        assertEquals(newInvoice.getId(), createdInvoice.getId());
        assertEquals(newInvoice.getSiteName(), createdInvoice.getSiteName());

    }

    private Invoice createSampleInvoice() {
        // Create a sample invoice for testing
        Invoice sampleInvoice = new Invoice();
        sampleInvoice.setSiteName("Sample Site");

        return sampleInvoice;
    }

    @Test
    public void testCreateInvoiceWithInvalidData() {
        Invoice invalidInvoice = createInvalidInvoice(); // Create an invoice with invalid data

        ResponseEntity<Invoice> response = invoiceController.createInvoice(invalidInvoice);

        // Negative assertion - Check that the HTTP status code is BAD REQUEST (400)
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());


    }

    private Invoice createInvalidInvoice() {
        // Create and return an invoice with intentionally invalid data for testing
        Invoice invalidInvoice = new Invoice();
        // Set invalid data, for example:
        invalidInvoice.setSiteName(null); // Set a required field to null

        return invalidInvoice;
    }
}

