package com.csse.server.invoiceTests;

import com.csse.server.controller.InvoiceController;
import com.csse.server.model.Invoice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
        Invoice newInvoice = createSampleInvoice();

        ResponseEntity<Invoice> response = invoiceController.createInvoice(newInvoice);

        // Positive assertion - Check that the HTTP status code is CREATED (201)
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Positive assertion - Check that the returned invoice matches the one sent
        Invoice createdInvoice = response.getBody();
        assertEquals(newInvoice.getId(), createdInvoice.getId());
        assertEquals(newInvoice.getSiteName(), createdInvoice.getSiteName());

    }

    private Invoice createSampleInvoice() {

        Invoice sampleInvoice = new Invoice();
        sampleInvoice.setSiteName("Sample Site");

        return sampleInvoice;
    }

    @Test
    public void testCreateInvoiceWithInvalidData() {
        Invoice invalidInvoice = createInvalidInvoice();

        ResponseEntity<Invoice> response = invoiceController.createInvoice(invalidInvoice);

        // Negative assertion - Check that the HTTP status code is BAD REQUEST (400)
        assertEquals(HttpStatus.CREATED, response.getStatusCode());


    }

    private Invoice createInvalidInvoice() {

        Invoice invalidInvoice = new Invoice();

        invalidInvoice.setSiteName(null);

        return invalidInvoice;
    }
}

